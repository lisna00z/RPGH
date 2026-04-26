/*:
 * @target MZ
 * @plugindesc Rotate title posters and support Chinese/English switch on title.
 * @author Codex
 *
 * @param Images
 * @text Legacy Title Images
 * @type string[]
 * @default ["InfiniumPoster01","InfiniumPoster02","InfiniumPoster03"]
 *
 * @param ChineseImages
 * @text Chinese Title Images
 * @type string[]
 * @default ["InfiniumPoster01","InfiniumPoster02","InfiniumPoster03"]
 *
 * @param EnglishImages
 * @text English Title Images
 * @type string[]
 * @default ["InfiniumPoster01","InfiniumPoster02","InfiniumPoster03"]
 *
 * @param Interval
 * @text Interval (frames)
 * @type number
 * @min 1
 * @default 180
 *
 * @param DefaultLanguage
 * @text Default Language
 * @type select
 * @option Chinese
 * @value zh
 * @option English
 * @value en
 * @default zh
 *
 * @help
 * Rotates title background images on Scene_Title.
 * 180 frames = 3 seconds at 60 FPS.
 *
 * Also adds a language toggle command on title:
 * - Chinese / English
 * - Menu labels change with selected language
 * - Poster list switches by language
 * - Selection is saved in config
 */
(() => {
    const pluginName = "TitlePosterSlideshow";
    const params = PluginManager.parameters(pluginName);

    const parseArray = value => {
        let result = [];
        try {
            result = JSON.parse(value || "[]");
        } catch (_e) {
            result = [];
        }
        return result.map(s => String(s).trim()).filter(Boolean);
    };

    const legacyImages = parseArray(params.Images);
    let zhImages = parseArray(params.ChineseImages);
    let enImages = parseArray(params.EnglishImages);
    const interval = Math.max(1, Number(params.Interval || 180));
    const defaultLanguage = String(params.DefaultLanguage || "zh") === "en" ? "en" : "zh";

    if (zhImages.length === 0) {
        zhImages = legacyImages.slice();
    }
    if (enImages.length === 0) {
        enImages = legacyImages.slice();
    }
    if (zhImages.length === 0 && enImages.length > 0) {
        zhImages = enImages.slice();
    }
    if (enImages.length === 0 && zhImages.length > 0) {
        enImages = zhImages.slice();
    }

    if (zhImages.length === 0 && enImages.length === 0) {
        return;
    }

    const titleText = {
        zh: {
            newGame: "开始游戏",
            continue_: "继续游戏",
            options: "选项",
            language: "语言：中文"
        },
        en: {
            newGame: "New Game",
            continue_: "Continue",
            options: "Options",
            language: "Language: English"
        }
    };

    const currentLanguage = () => (ConfigManager.infiniumLanguage === "en" ? "en" : "zh");
    const setLanguage = lang => {
        ConfigManager.infiniumLanguage = lang === "en" ? "en" : "zh";
    };
    const toggleLanguage = () => {
        setLanguage(currentLanguage() === "zh" ? "en" : "zh");
        ConfigManager.save();
    };
    const postersForLanguage = lang => (lang === "en" ? enImages : zhImages);

    ConfigManager.infiniumLanguage = defaultLanguage;
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.infiniumLanguage = currentLanguage();
        return config;
    };
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        const lang = config && config.infiniumLanguage ? String(config.infiniumLanguage) : defaultLanguage;
        setLanguage(lang);
    };

    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        const lang = currentLanguage();
        this._list = [];
        const continueEnabled = this.isContinueEnabled();
        this.addCommand(titleText[lang].newGame, "newGame");
        this.addCommand(titleText[lang].continue_, "continue", continueEnabled);
        this.addCommand(titleText[lang].options, "options");
        this.addCommand(titleText[lang].language, "toggleLanguage");
    };

    const _Scene_Title_commandWindowRect = Scene_Title.prototype.commandWindowRect;
    Scene_Title.prototype.commandWindowRect = function() {
        const rect = _Scene_Title_commandWindowRect.call(this);
        const wh = this.calcWindowHeight(4, true);
        return new Rectangle(rect.x, rect.y + (rect.height - wh), rect.width, wh);
    };

    Scene_Title.prototype.refreshPosterForLanguage = function(resetIndex) {
        if (!this._backSprite1) {
            return;
        }
        const list = postersForLanguage(currentLanguage());
        this._posterImages = list.slice();
        if (this._posterImages.length === 0) {
            return;
        }
        if (resetIndex || !Number.isInteger(this._posterIndex) || this._posterIndex >= this._posterImages.length) {
            const defaultIndex = this._posterImages.indexOf($dataSystem.title1Name);
            this._posterIndex = defaultIndex >= 0 ? defaultIndex : 0;
        }
        this._posterTimer = 0;
        this._backSprite1.bitmap = ImageManager.loadTitle1(this._posterImages[this._posterIndex]);
    };

    const _Scene_Title_createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function() {
        _Scene_Title_createBackground.call(this);
        this._posterImages = [];
        this._posterTimer = 0;
        this._posterIndex = 0;
        this.refreshPosterForLanguage(true);
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler("toggleLanguage", this.commandToggleLanguage.bind(this));
    };

    Scene_Title.prototype.commandToggleLanguage = function() {
        toggleLanguage();
        this._commandWindow.refresh();
        this._commandWindow.selectSymbol("toggleLanguage");
        this._commandWindow.activate();
        this.refreshPosterForLanguage(true);
    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        if (!this._posterImages || this._posterImages.length <= 1 || !this._backSprite1) {
            return;
        }

        this._posterTimer += 1;
        if (this._posterTimer >= interval) {
            this._posterTimer = 0;
            this._posterIndex = (this._posterIndex + 1) % this._posterImages.length;
            this._backSprite1.bitmap = ImageManager.loadTitle1(this._posterImages[this._posterIndex]);
        }
    };
})();

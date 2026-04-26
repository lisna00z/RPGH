/*:
 * @target MZ
 * @plugindesc Infinium minimal menu: Luna portrait + localized basic commands only.
 * @author Codex
 *
 * @help
 * Keeps the map menu focused:
 * - Only one status slot (party leader)
 * - Draws a single stand portrait (default: Luna_Stand)
 * - Hides class/level/HP/MP/TP/gold
 * - Keeps only Options / Save / End Game commands
 * - Command labels follow ConfigManager.infiniumLanguage (zh/en)
 */
(() => {
    "use strict";

    const STAND_PICTURE = "Luna_Stand";
    const commandText = {
        zh: {
            options: "选项",
            save: "保存",
            gameEnd: "游戏结束"
        },
        en: {
            options: "Options",
            save: "Save",
            gameEnd: "End Game"
        }
    };

    const currentLanguage = () => (ConfigManager.infiniumLanguage === "en" ? "en" : "zh");

    Window_MenuCommand.prototype.makeCommandList = function() {
        const text = commandText[currentLanguage()];
        this.addCommand(text.options, "options", this.isOptionsEnabled());
        this.addCommand(text.save, "save", this.isSaveEnabled());
        this.addCommand(text.gameEnd, "gameEnd", this.isGameEndEnabled());
    };

    Scene_Menu.prototype.createGoldWindow = function() {
        this._goldWindow = null;
    };

    Scene_Menu.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.mainAreaHeight();
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.statusWindowRect = function() {
        const ww = Graphics.boxWidth - this.mainCommandWidth();
        const wh = this.mainAreaHeight();
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Window_MenuStatus.prototype.maxItems = function() {
        return Math.min(1, $gameParty.size());
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };

    Window_MenuStatus.prototype.actor = function(index) {
        if (index !== 0) {
            return null;
        }
        return $gameParty.leader() || $gameParty.members()[0] || null;
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        const actor = this.actor(index);
        if (!actor) {
            return;
        }

        const rect = this.itemRect(index);
        const bitmap = ImageManager.loadPicture(STAND_PICTURE);
        const drawFallbackFace = () => {
            const faceW = ImageManager.standardFaceWidth;
            const faceH = ImageManager.standardFaceHeight;
            const dx = rect.x + Math.floor((rect.width - faceW) / 2);
            const dy = rect.y + Math.floor((rect.height - faceH) / 2);
            this.drawActorFace(actor, dx, dy, faceW, faceH);
        };

        if (!bitmap || bitmap.isError()) {
            drawFallbackFace();
            return;
        }

        if (!bitmap.isReady()) {
            bitmap.addLoadListener(() => this.refresh());
            return;
        }

        const margin = 16;
        const maxW = Math.max(1, rect.width - margin * 2);
        const maxH = Math.max(1, rect.height - margin * 2);
        const scale = Math.min(maxW / bitmap.width, maxH / bitmap.height, 1);
        const dw = Math.max(1, Math.floor(bitmap.width * scale));
        const dh = Math.max(1, Math.floor(bitmap.height * scale));
        const dx = rect.x + Math.floor((rect.width - dw) / 2);
        const dy = rect.y + Math.floor((rect.height - dh) / 2);
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
    };

    Window_MenuStatus.prototype.drawItemStatus = function() {
        // Keep this window image-only: no class/level/HP/MP/TP text.
    };

    Window_MenuStatus.prototype.selectLast = function() {
        this.smoothSelect(0);
    };

    Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
        return false;
    };

    Window_MenuStatus.prototype.processOk = function() {
        // Intentionally disabled in minimal menu.
    };
})();

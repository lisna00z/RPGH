/*:
 * @target MZ
 * @plugindesc Play opening intro movie once before title scene.
 * @author Codex
 *
 * @param MovieFile
 * @text Movie File
 * @type string
 * @default infinium_opening.mp4
 *
 * @param AllowSkip
 * @text Allow Skip
 * @type boolean
 * @on true
 * @off false
 * @default true
 */

(() => {
    "use strict";
    const pluginName = "OpeningIntroVideo";
    const params = PluginManager.parameters(pluginName);
    const movieFile = String(params.MovieFile || "infinium_opening.mp4");
    const allowSkip = String(params.AllowSkip || "true") === "true";
    let played = false;

    function Scene_OpeningIntroVideo() {
        this.initialize(...arguments);
    }

    Scene_OpeningIntroVideo.prototype = Object.create(Scene_Base.prototype);
    Scene_OpeningIntroVideo.prototype.constructor = Scene_OpeningIntroVideo;

    Scene_OpeningIntroVideo.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
        this._startedMovie = false;
        this._gotoTitleQueued = false;
    };

    Scene_OpeningIntroVideo.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this.playIntroMovie();
    };

    Scene_OpeningIntroVideo.prototype.playIntroMovie = function() {
        if (this._startedMovie) {
            return;
        }
        this._startedMovie = true;
        Video.play("movies/" + movieFile);
    };

    Scene_OpeningIntroVideo.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        if (!this._startedMovie) {
            return;
        }
        if (allowSkip && (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered())) {
            const video = Video._element;
            if (video && video.src) {
                try {
                    video.pause();
                } catch (e) {
                    // no-op
                }
                Video._onEnd();
            }
        }
        if (!Video.isPlaying()) {
            this.gotoTitle();
        }
    };

    Scene_OpeningIntroVideo.prototype.gotoTitle = function() {
        if (this._gotoTitleQueued) {
            return;
        }
        this._gotoTitleQueued = true;
        SceneManager.goto(Scene_Title);
    };

    const _Scene_Splash_gotoTitle = Scene_Splash.prototype.gotoTitle;
    Scene_Splash.prototype.gotoTitle = function() {
        if (played || DataManager.isBattleTest() || DataManager.isEventTest()) {
            _Scene_Splash_gotoTitle.call(this);
            return;
        }
        played = true;
        SceneManager.goto(Scene_OpeningIntroVideo);
    };
})();

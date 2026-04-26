/*:
 * @target MZ
 * @plugindesc INFINIUM dialogue CN/EN switch (follows title language selection).
 * @author Codex
 *
 * @help
 * This plugin localizes dialogue at runtime based on:
 *   ConfigManager.infiniumLanguage
 *
 * Language values:
 *   - "zh": Chinese (original event text)
 *   - "en": English (translated text)
 *
 * The value is controlled by the title language toggle from
 * TitlePosterSlideshow plugin.
 */
(() => {
    "use strict";

    const TEXT_EN = Object.freeze({
        "……": "...",
        "……也好。": "...Fine.",
        "……你来了。": "...You came.",
        "……对不起。": "...I'm sorry.",
        "……差一点。": "...That was close.",
        "……我不会强迫你。": "...I won't force you.",
        "……所以呢。": "...So what?",
        "……放开我。": "...Let me go.",
        "……没事的。": "...It's okay.",
        "【旁白】Luna被推着向前，直到那个人影面前。": "[Narration] Luna is pushed forward until she stands before that figure.",
        "【旁白】两道门在身后闭合，你来到一座空旷的议事厅。": "[Narration] The two doors close behind you. You arrive at an empty council hall.",
        "【旁白】传送门尚未稳定，先去书架前找守书人。": "[Narration] The portal is not stable yet. Talk to the Archivist by the bookshelf first.",
        "【旁白】你恢复了行动。": "[Narration] You can move again.",
        "【旁白】你暂时获得了行动权。下一幕即将开始。": "[Narration] You temporarily regain control. The next act is about to begin.",
        "【旁白】你的线索彼此冲突，却指向同一个真相：献祭不是神意，而是制度。": "[Narration] Your clues conflict with each other, yet point to one truth: the sacrifice is not divine will, but a system.",
        "【旁白】你穿过右侧传送门，藏书阁的书页在黑暗里自行翻动。": "[Narration] You pass through the right portal. Pages in the archive turn by themselves in the dark.",
        "【旁白】你穿过左侧传送门，脚下回廊像镜面一样延伸。": "[Narration] You pass through the left portal. The corridor under your feet stretches like a mirror.",
        "【旁白】你被无形的力推着向前，直到那个人影面前。": "[Narration] An unseen force pushes you forward until you face that figure.",
        "【旁白】你记下了「裂镜徽记」。": "[Narration] You obtain the \"Fractured Mirror Sigil.\"",
        "【旁白】你踏入传送门。": "[Narration] You step into the portal.",
        "【旁白】你踏入右侧传送门。": "[Narration] You step into the right portal.",
        "【旁白】你踏入左侧传送门。": "[Narration] You step into the left portal.",
        "【旁白】你需要先在这两个传送门中选择一个。": "[Narration] You need to choose one of these two portals first.",
        "【旁白】先在这里整理线索，再决定下一步。": "[Narration] Organize your clues here first, then decide your next move.",
        "【旁白】前往传送门，离开回廊。": "[Narration] Head to the portal to leave the corridor.",
        "【旁白】前往传送门，离开藏书阁。": "[Narration] Head to the portal to leave the archive.",
        "【旁白】前往传送门，继续前进。": "[Narration] Go to the portal and continue.",
        "【旁白】墙面裂开一道光，你在碎片里看见自己的影子。": "[Narration] A line of light splits the wall. In the shards, you see your own silhouette.",
        "【旁白】最后一页落下，你得到「誓约残页」。": "[Narration] The final page falls. You obtain the \"Oath Fragment.\"",
        "【旁白】每一步都会响起陌生又熟悉的回声。": "[Narration] Every step echoes with something both strange and familiar.",
        "【旁白】现在请选择一个传送门。": "[Narration] Now choose a portal.",
        "【旁白】空气里有金属与灰烬的味道。": "[Narration] The air tastes of metal and ash.",
        "【旁白】门在身后合上，像一声判决。": "[Narration] The door shuts behind you like a verdict.",
        "【旁白】高塔顶层，空气冷得像金属。": "[Narration] At the top of the tower, the air is cold like metal.",
        "一个少女的灵魂。": "A young girl's soul.",
        "不——你当然不知道。没人知道。": "No—you don't. No one does.",
        "不是命令。是请求。": "Not an order. A request.",
        "传送门已经稳定，去传送门吧。": "The portal is stable now. Go to the portal.",
        "但我不能离开。": "But I cannot leave.",
        "你也知道我会害怕。": "And you knew I would be afraid.",
        "你到底站在哪一边。": "Which side are you really on?",
        "你在开玩笑。": "You're joking.",
        "你就是Aurelius？": "So you're Aurelius?",
        "你的事，与我无关。": "Your affairs have nothing to do with me.",
        "你看起来像快要碎掉了。": "You look like you're about to shatter.",
        "你知道我会被带来。": "You knew they would bring me here.",
        "你知道这座城市的守护神吗。": "Do you know this city's guardian god?",
        "做什么——": "What are you doing—",
        "别同情我。": "Don't pity me.",
        "好吧。": "Fine.",
        "如果你想走，我会给你时间。": "If you want to leave, I'll give you time.",
        "如果你看到这段记录，说明我还是没能阻止他们。": "If you're seeing this record, it means I still failed to stop them.",
        "对不起。": "I'm sorry.",
        "我不会相信你。": "I won't believe you.",
        "我们已经没有回头路了。准备好时，我们就继续前进。": "There's no way back now. When you're ready, we'll move forward.",
        "我会在这里等你回来。": "I'll wait for you here.",
        "我会陪你走到最后。": "I'll stay with you to the end.",
        "我拖延过很多次，但每一次都只是把痛苦往后推。": "I've delayed it many times, but each time only pushed the pain further down the line.",
        "我没有开玩笑。": "I'm not joking.",
        "我知道。": "I know.",
        "我站在你这一边。哪怕你现在不会信。": "I'm on your side. Even if you can't believe that right now.",
        "所以那所谓的守护神，一直在吞掉人的名字？": "So that so-called guardian has been swallowing people's names all along?",
        "所以，从今天起，你的命不再属于你自己。": "So from today on, your life no longer belongs to you.",
        "把人绑来，叫请求？": "Abducting someone is what you call a request?",
        "把手放在书架上，记忆会回应你。": "Put your hand on the shelf. Memory will answer you.",
        "无论你想知道什么。": "Whatever you want to know.",
        "日落前，我要答案。": "I want your answer before sunset.",
        "明日日落前，做出你的选择。": "Make your choice before sunset tomorrow.",
        "是。": "Yes.",
        "是你让他们带我来的？": "Were you the one who had them bring me here?",
        "每一百年，守护神都要一份馈赠。": "Every hundred years, the guardian demands a tribute.",
        "现在你知道了。王都不是在保护人，而是在挑选牺牲品。": "Now you know. The royal capital isn't protecting people, it's selecting sacrifices.",
        "被写进契约的人，不会被历史记住。": "Those written into the covenant are never remembered by history.",
        "誓约的线索已凑齐，去传送门继续前进。": "The clues of the oath are complete. Head to the portal and continue.",
        "这是……Aurelius的声音？": "This is... Aurelius's voice?",
        "这是底线。": "This is the line that cannot be crossed.",
        "这样更安全。": "That's safer.",
        "这里不是神殿……更像是谁的记忆。": "This isn't a temple... it's more like someone's memory.",
        "那就把规则撕开。": "Then let's tear the rules apart.",
        "他很可怕。": "He is terrifying.",
        "他很悲伤。": "He looks deeply sad.",
        "他和我无关。": "He has nothing to do with me.",
        "你们是谁。凭什么。": "Who are you? What gives you the right?",
        "（不说话，挣扎）": "(Stay silent, struggle.)"
    });

    const NAME_EN = Object.freeze({
        "守书人": "Archivist",
        "残影": "Echo"
    });

    const language = () => (ConfigManager.infiniumLanguage === "en" ? "en" : "zh");

    const trText = value => {
        const text = String(value ?? "");
        if (language() !== "en") {
            return text;
        }
        return Object.prototype.hasOwnProperty.call(TEXT_EN, text) ? TEXT_EN[text] : text;
    };

    const trName = value => {
        const name = String(value ?? "");
        if (language() !== "en" || !name) {
            return name;
        }
        return Object.prototype.hasOwnProperty.call(NAME_EN, name) ? NAME_EN[name] : name;
    };

    const _Game_Message_add = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
        _Game_Message_add.call(this, trText(text));
    };

    const _Game_Message_setSpeakerName = Game_Message.prototype.setSpeakerName;
    Game_Message.prototype.setSpeakerName = function(speakerName) {
        _Game_Message_setSpeakerName.call(this, trName(speakerName));
    };

    const _Game_Message_setChoices = Game_Message.prototype.setChoices;
    Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
        const translatedChoices = Array.isArray(choices) ? choices.map(choice => trText(choice)) : choices;
        _Game_Message_setChoices.call(this, translatedChoices, defaultType, cancelType);
    };
})();


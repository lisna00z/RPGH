# infinium (RPG Maker MZ Project)

`infinium` 是一个基于 **RPG Maker MZ** 的角色扮演游戏项目仓库，包含游戏数据、脚本插件、图像/音频/视频资源，以及地图与素材导入记录文档。

## Project Snapshot

- Engine: RPG Maker MZ
- Entry: `index.html`
- Project file: `game.rmmzproject`
- Window: `816 x 624`
- Locale: `zh_CN`
- Repository: [lisna00z/RPGH](https://github.com/lisna00z/RPGH)

## Current Gameplay Features (Plugins)

当前启用的自定义插件（见 `js/plugins.js`）：

- `OpeningIntroVideo`: 进入标题前播放开场视频（`movies/infinium_opening.mp4`）
- `TitlePosterSlideshow`: 标题页海报轮播（默认中文）
- `InfiniumDialogueI18n`: 中英对话切换
- `InfiniumMinimalMenu`: 精简菜单（Options / Save / End Game）

## Quick Start

### 1) 编辑与开发（推荐）

1. 使用 RPG Maker MZ 打开 `game.rmmzproject`
2. 在编辑器中进行地图/事件/数据库修改
3. 使用 Playtest 测试运行

### 2) 网页入口运行

仓库入口为 `index.html`，依赖 `js/main.js` 与 `data/`、`img/`、`audio/` 等资源目录。

## Folder Structure

```text
sd5976project/
├─ audio/                # BGM/BGS/ME/SE
├─ css/                  # 游戏样式
├─ data/                 # RPG Maker 数据库与地图 JSON
├─ effects/              # 特效资源
├─ fonts/                # 字体资源
├─ icon/                 # 图标
├─ img/                  # 图片资源（角色、地图块、标题图等）
├─ js/                   # 引擎脚本与插件
├─ movies/               # 开场/过场视频
├─ save/                 # 存档
├─ _import_cache_maps/   # 地图与素材导入缓存
├─ game.rmmzproject      # MZ 工程文件
├─ map_import_report.md
└─ imported_ready_maps_report.md
```

## Documentation Summary

### `map_import_report.md`

- Time: `2026-04-17 15:09:41`
- Imported source assets into project tileset/parallax directories
- Tilesets now: `433` (approx `+367`)
- Parallaxes now: `72` (approx `+14`)
- Archive scan: ZIP `8`, RAR `1`
- Note: 文档记录了 RAR 素材补充导入情况及 `7-Zip` 相关说明

### `imported_ready_maps_report.md`

- Time: `2026-04-17 15:25:19`
- Map files in `data/`: `424`
- `MapInfos.json` non-null entries: `430`
- Imported map folders (`IMP_*`): `6`
- Tileset entries (non-null): `36`
- Includes backup note: `data/MapInfos.json.bak`, `data/Tilesets.json.bak`

## Notes

- 该仓库包含大量素材与缓存资源，首次克隆/推送体积较大。
- `save/` 目录当前包含示例存档（`file0.rmmzsave`、`global.rmmzsave` 等）。

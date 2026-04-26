# infinium (RPG Maker MZ Project)

[简体中文](#简体中文) | [English](#english)

## 简体中文

### 项目简介

`infinium` 是一个基于 **RPG Maker MZ** 的角色扮演游戏项目仓库，包含游戏数据、脚本插件、图像/音频/视频资源，以及地图与素材导入记录文档。

### 项目快照

- 引擎：RPG Maker MZ
- 入口：`index.html`
- 工程文件：`game.rmmzproject`
- 窗口尺寸：`816 x 624`
- 语言环境：`zh_CN`
- 仓库地址：[lisna00z/RPGH](https://github.com/lisna00z/RPGH)

### 当前功能（插件）

当前启用的自定义插件（见 `js/plugins.js`）：

- `OpeningIntroVideo`：进入标题前播放开场视频（`movies/infinium_opening.mp4`）
- `TitlePosterSlideshow`：标题页海报轮播（默认中文）
- `InfiniumDialogueI18n`：中英对话切换
- `InfiniumMinimalMenu`：精简菜单（Options / Save / End Game）

### 快速开始

1. 使用 RPG Maker MZ 打开 `game.rmmzproject`
2. 在编辑器中进行地图/事件/数据库修改
3. 使用 Playtest 测试运行

网页入口为 `index.html`，依赖 `js/main.js` 与 `data/`、`img/`、`audio/` 等资源目录。

### 目录结构

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

### 文档摘要

`map_import_report.md`

- 时间：`2026-04-17 15:09:41`
- 素材已导入到项目 tileset/parallax 目录
- Tilesets 数量：`433`（约新增 `+367`）
- Parallaxes 数量：`72`（约新增 `+14`）
- 压缩包扫描：ZIP `8`，RAR `1`
- 备注：记录了 RAR 补充导入及 `7-Zip` 相关说明

`imported_ready_maps_report.md`

- 时间：`2026-04-17 15:25:19`
- `data/` 中地图文件数：`424`
- `MapInfos.json` 非空条目：`430`
- 导入地图目录（`IMP_*`）：`6`
- Tileset 非空条目：`36`
- 备份文件：`data/MapInfos.json.bak`、`data/Tilesets.json.bak`

### 说明

- 该仓库包含大量素材与缓存资源，首次克隆/推送体积较大。
- `save/` 目录当前包含示例存档（`file0.rmmzsave`、`global.rmmzsave` 等）。

## English

### Overview

`infinium` is an **RPG Maker MZ** project repository containing game data, custom plugins, image/audio/video assets, and map/asset import documentation.

### Project Snapshot

- Engine: RPG Maker MZ
- Entry: `index.html`
- Project file: `game.rmmzproject`
- Window size: `816 x 624`
- Locale: `zh_CN`
- Repository: [lisna00z/RPGH](https://github.com/lisna00z/RPGH)

### Current Features (Plugins)

Enabled custom plugins (see `js/plugins.js`):

- `OpeningIntroVideo`: Plays an intro video before the title scene (`movies/infinium_opening.mp4`)
- `TitlePosterSlideshow`: Rotates title posters (default language: Chinese)
- `InfiniumDialogueI18n`: Chinese/English dialogue switching
- `InfiniumMinimalMenu`: Minimal map menu (Options / Save / End Game)

### Quick Start

1. Open `game.rmmzproject` with RPG Maker MZ
2. Edit maps/events/database in the editor
3. Run Playtest for local testing

Web entry point is `index.html`, which relies on `js/main.js` and resource folders such as `data/`, `img/`, and `audio/`.

### Folder Structure

```text
sd5976project/
├─ audio/                # BGM/BGS/ME/SE
├─ css/                  # Game styles
├─ data/                 # RPG Maker database and map JSON
├─ effects/              # Effect assets
├─ fonts/                # Font assets
├─ icon/                 # Icons
├─ img/                  # Image assets (characters, tilesets, title images, etc.)
├─ js/                   # Engine scripts and plugins
├─ movies/               # Intro/cutscene videos
├─ save/                 # Save data
├─ _import_cache_maps/   # Imported map/asset cache
├─ game.rmmzproject      # MZ project file
├─ map_import_report.md
└─ imported_ready_maps_report.md
```

### Documentation Summary

`map_import_report.md`

- Time: `2026-04-17 15:09:41`
- Source assets imported into project tileset/parallax directories
- Tilesets: `433` (approximately `+367`)
- Parallaxes: `72` (approximately `+14`)
- Archive scan: ZIP `8`, RAR `1`
- Note: Includes details about RAR supplemental import and `7-Zip` usage

`imported_ready_maps_report.md`

- Time: `2026-04-17 15:25:19`
- Map files in `data/`: `424`
- Non-null entries in `MapInfos.json`: `430`
- Imported map folders (`IMP_*`): `6`
- Non-null tileset entries: `36`
- Backup files: `data/MapInfos.json.bak`, `data/Tilesets.json.bak`

### Notes

- This repository contains many assets and cache files, so first clone/push can be large.
- `save/` currently includes sample save files (`file0.rmmzsave`, `global.rmmzsave`, etc.).

# 搜短剧

macOS 与 Windows 桌面播放器，用于浏览和播放短剧。仓库是 <https://github.com/1moc/souduanju>。这不是红果官方客户端，也没有账号登录。

代码来自 [zfdang/hongguo-open-player](https://github.com/zfdang/hongguo-open-player/tree/f57df9c0d980c272714d270bd7065d55fd197de1) 的提交 `f57df9c0d980c272714d270bd7065d55fd197de1`。应用内版权行保留 **Copyright © 2026 zfdang**。上游说明原文在 [README.upstream.md](README.upstream.md)；那里的应用名、下载地址和 GPL 徽章属于上游仓库，不能当作本仓库的安装包说明。

项目网页的源文件在 [website/](website/index.html)，和 Electron 应用入口分开，不收集个人信息。它还没有发布到 GitHub Pages。合并到 `main` 并把 Pages 的来源设为 GitHub Actions 之后，默认地址才会是 <https://1moc.github.io/souduanju/>。

## 支持的系统

| 系统 | 架构 | 安装包 |
| --- | --- | --- |
| macOS Apple Silicon（M 系列） | arm64 | `.dmg`、`.zip` |
| macOS Intel | x64 | `.dmg`、`.zip` |
| Windows 10 / 11 | x64 | 安装向导 `.exe`、便携 `.exe`、`.zip` |

没有 Linux 安装包，也没有 Windows 32 位或 ARM 安装包。界面里的 Linux 样式类只在浏览器中生效。

## 下载与安装

已发布的稳定版是 [v1.0.1](https://github.com/1moc/souduanju/releases/tag/v1.0.1)。发布页：<https://github.com/1moc/souduanju/releases>

| 文件 | 大小（字节） | SHA256 |
| --- | ---: | --- |
| [souduanju-1.0.1-mac-arm64.dmg](https://github.com/1moc/souduanju/releases/download/v1.0.1/souduanju-1.0.1-mac-arm64.dmg) | 130784996 | `6e26772dec2d694924feae3c82fbac4635cad06f3e683a418b55a7cd77241155` |
| [souduanju-1.0.1-mac-arm64.zip](https://github.com/1moc/souduanju/releases/download/v1.0.1/souduanju-1.0.1-mac-arm64.zip) | 125754141 | `f8bfea6c0d017d1c4131cf434e61631b42ee2d82946967c2e415ee9681f4e906` |
| [souduanju-1.0.1-mac-x64.dmg](https://github.com/1moc/souduanju/releases/download/v1.0.1/souduanju-1.0.1-mac-x64.dmg) | 138172992 | `c3d4b4f796a35ba3b676f496636cae6782e1fd483eb8e3477f9a79d9cefcd087` |
| [souduanju-1.0.1-mac-x64.zip](https://github.com/1moc/souduanju/releases/download/v1.0.1/souduanju-1.0.1-mac-x64.zip) | 133124258 | `66fce8d47f36c3e51f3097a7b21ffd6ab32883c52cc9394eada501ff6f8415ee` |
| [souduanju-1.0.1-win-x64-setup.exe](https://github.com/1moc/souduanju/releases/download/v1.0.1/souduanju-1.0.1-win-x64-setup.exe) | 127397224 | `6a8a59067f534706163d8f9e3d807c65128de9b75f988af41f881519bd40dbc2` |
| [souduanju-1.0.1-win-x64-portable.exe](https://github.com/1moc/souduanju/releases/download/v1.0.1/souduanju-1.0.1-win-x64-portable.exe) | 115461625 | `2a8984beab6702888bd84d5cd494aed18e1aca1732af175dc5c4ea3a8ad1a77d` |
| [souduanju-1.0.1-win-x64.zip](https://github.com/1moc/souduanju/releases/download/v1.0.1/souduanju-1.0.1-win-x64.zip) | 162101525 | `0d504474e806f9b8015d3689496751c8984e7000ec5fcb72f50b1a1c26482edc` |

校验文件：[SHA256SUMS.txt](https://github.com/1moc/souduanju/releases/download/v1.0.1/SHA256SUMS.txt)。这些哈希来自发布任务对实际上传文件计算的结果。

macOS 将 dmg 里的「搜短剧」拖到「应用程序」。Windows 安装向导可选目录，并创建桌面和开始菜单快捷方式；便携版直接运行；zip 解压后运行 `搜短剧.exe`。`package.json` 里的开发版本仍是 1.0.0，安装包版本由发布任务写成 1.0.1。

这些安装包没有正式签名：

- macOS 只有 ad-hoc 签名（electron-builder 的 `identity` 为 `"-"`），没有 Apple Developer ID 签名，也没有公证。
- Windows 没有 Authenticode 签名。

macOS 可能提示应用「已损坏」或无法打开。先确认文件来自上面的 Release，并且 SHA256 一致。如果只是下载隔离标记导致，可以在终端执行：

```bash
xattr -dr com.apple.quarantine "/Applications/搜短剧.app"
```

这条命令只去掉该应用的隔离标记，不会关闭系统的安全检查。安装位置不同时，换成实际路径。系统若提示恶意软件，或重新下载后仍怀疑文件被改过，不要运行这条命令。参见 [Apple 的打开应用说明](https://support.apple.com/zh-cn/102445)。

Windows 可能显示「Windows 已保护你的电脑」。这是未签名程序的系统提示，不表示安装包已经签名。

## 基本使用

- **热门榜、新剧榜**：按分类浏览。
- **找剧**：搜索剧名、演员或题材。最近 10 条搜索保存在本机，可以单条删除或清空。
- **剧星榜**：查看演员并进入主页，点作品开始播放。
- **播放**：选集、自动下一集。多季剧按季排序后切换。
- **弹幕**：可以开关，并调整行数、速度和不透明度。
- **观看历史、收藏**：记住剧集和播放进度。
- 播放时打开其他页面，视频会暂停并缩到右下角。「继续播放」回到原来的进度；「退出播放」或关闭小窗会结束这次播放。

播放页快捷键：空格或 `K` 播放/暂停，`↑` / `PageUp` 上一集，`↓` / `PageDown` 下一集，`←` / `→` 快退或快进 5 秒，`F` 或双击画面全屏，`J` 显示或隐藏选集栏，`M` 静音，`Esc` 退出全屏或退出播放。

`docs/screenshots/` 是界面截图。`docs/界面审核/` 是布局审核稿，内容是示例，不是实时榜单。

## 数据与隐私

没有账号登录。观看历史、收藏、最近搜索和界面偏好写在本机，不会上传到这个 GitHub 仓库。

桌面版目录：

- macOS：`~/Library/Application Support/搜短剧/data/`
- Windows：`%APPDATA%\搜短剧\data\`

`user_data.json` 是历史、收藏、搜索和偏好。`device.json` 是播放时在本机注册的匿名设备信息。日志在同级的 `logs/`，帮助菜单可以打开。用 `npm start` 直接运行时，数据在项目里的 `data/`，日志在 `logs/`。

源码不包含可复用的设备身份或 Cookie。设备信息只在每台电脑本地生成。不要把 `device.json` 提交或公开。

## 更新

正式安装包在构建时写入本仓库地址。应用启动时，以及菜单「检查更新」或关于页，会查看最新的稳定 Release。发现更高版本后，可以打开发布说明，或下载与当前系统匹配的安装包再手动安装。Windows 便携版优先匹配便携包；macOS 区分 Apple Silicon 和 Intel。没有匹配的附件时，仍可打开该版本的发布页。应用不会自动覆盖安装。

直接用源码运行、尚未写入更新仓库时，关于页显示「此构建尚未设置更新仓库」。

## 常见问题

**macOS 提示已损坏。** 安装包没有公证，Gatekeeper 可能拦截。处理方式见上文，先核对来源和 SHA256。

**Windows 被 SmartScreen 拦截。** 安装包没有正式代码签名。只从本仓库 Release 下载，并核对 SHA256。

**检查更新说尚未设置更新仓库。** 当前运行的不是写入了仓库名的正式安装包，例如本地执行 `npm run app`。

**榜单或播放失败。** 节目来自第三方公开接口，是否可看会变化。本仓库不保存剧集文件。访问真实接口的检查不会在每次提交时自动运行。

## 开发

安装 Node.js 22 和 npm。发布工作流使用 Node 22。CI 的离线单元测试同时覆盖 Node 20 和 22。

```sh
npm ci
npm run app
```

`npm start`、`./start.sh` 和 `start.bat` 只启动本地网页并打开浏览器。`npm run app` 才会打开 Electron 窗口。

离线测试：

```sh
npm run test:unit
```

`npm test` 和 `npm run test:e2e` 会请求真实第三方接口，日常不要运行。`npm run test:arm64` 也依赖真实环境和指定剧集，不是常规测试。

打包前要在目标系统和架构上执行 `bash scripts/build-bytevc2.sh`。解码器输出到 `build/bytevc2/<arch>/`，不纳入 Git。不要在 Linux 上交叉编译 macOS 安装包。

```sh
npm run build:mac:arm64
npm run build:mac:x64
npm run build:win
```

`npm run build:mac` 会在同一台 Mac 上打出 arm64 和 x64，但 x64 解码器仍要事先在 Intel Mac 上编译。这些命令都带 `--publish never`，不会自行上传 Release。

## GitHub Actions

公开仓库使用标准免费托管 runner，不使用付费的 larger runner。

- [CI](https://github.com/1moc/souduanju/actions/workflows/ci.yml)：拉取请求和 `main` 上运行离线单元测试（Ubuntu 24.04、Windows，Node 20 与 22）。ByteVC2 在拉取请求和手动运行时编译（macOS 15 arm64、macOS 15 Intel、Windows x64）。推送到 `main` 时不再重复编译解码器，以免和发布任务叠在一起。
- [Build & Release Native Apps](https://github.com/1moc/souduanju/actions/workflows/build-release.yml)：`main` 推送、`v*` 标签和手动运行。任务会计算版本，在 Intel Mac 和 Windows 上编译对应解码器，并在打包用的 `macos-latest` 上编译 Apple Silicon 解码器。随后执行 `npm ci` 和单元测试，用 electron-builder 生成 macOS arm64/x64 与 Windows x64 安装包，连同 `SHA256SUMS.txt` 上传到 Release。单独排队的 `macos-15` Apple Silicon 任务曾因托管 runner 容量被取消，所以 Apple Silicon 解码器改在打包任务里编译。
- [Live API Verification](https://github.com/1moc/souduanju/actions/workflows/live-verification.yml)：只能手动运行。它会访问真实第三方接口，导入源码和日常提交不会自动触发。
- [Project website](https://github.com/1moc/souduanju/actions/workflows/pages.yml)：只在 `website/` 或该工作流文件变化时，把静态项目页发布到 GitHub Pages。它不编译客户端，也不上传安装包。只改网站、文档或发布脚本时，版本计算会跳过桌面安装包构建。

还没有旧标签时，`main` 上的普通提交按补丁从 1.0.0 升到 v1.0.1，并且只发布这一次。发布任务用 `GITHUB_TOKEN` 创建的标签不会再启动第二次构建；如果仍出现 `github-actions[bot]` 的标签推送，准备步骤会跳过。手动发布要在 `main` 上运行，不要对着已有标签运行。提交说明中的 `feat:` 会升次版本，`BREAKING CHANGE` 会升主版本。提交说明包含 `[skip release]` 且没有其他需要升版本的提交时，不会再次打包。

## 相对上游的修改

- 应用名、快捷方式和安装包前缀改为搜短剧，`appId` 为 `app.souduanju.player`。
- `package.json` 的 `repository` 和关于页项目地址改为 `1moc/souduanju`，并保留上游链接。
- `start.sh` 和 `start.bat` 的启动文案改为搜短剧。
- 包许可和界面与上游 `LICENSE` 中的 AGPL-3.0 对齐，说明见下一节。
- 去掉源码中的可复用设备身份。匿名注册失败时不再回退到内置身份。
- 两个进程几乎同时写入本地数据时，同时比较文件修改时间和大小，避免后一次写入丢掉先写入的历史或收藏。
- 在线验证改为手动。发布任务避免标签回环造成第二次构建。
- macOS 打包固定为 ad-hoc，说明和 Release 正文写明未公证，Windows 未正式签名。

没有改写上游的播放实现，也没有增加绕过步骤。

## 许可证与第三方组件

上游该提交的 `LICENSE` 是 **GNU AGPL-3.0** 全文。同一提交的 `package.json`、不少 `SPDX-License-Identifier` 和 README 徽章写成了 GPL-3.0-only，与 `LICENSE` 不一致。本仓库以 `LICENSE` 为准：`package.json` 为 `AGPL-3.0-only`，界面显示 AGPL-3.0。本仓库自己的源文件 SPDX 已改为 AGPL-3.0-only。

下面的文件保留原来的 GPL 归属，版权说明没有改写：

- `src/server/native/argus.js`：改编自 fqapp / N3urda/hongguoTV，GPL-3.0-only。
- `src/server/native/playback-device.js`：改编自 tsukiyo-zero/hongguoTV，来源包括 charlie901208/HGTV，GPL-3.0-only。
- `src/server/native/danmaku-sign.js`：改编自 dawei233/hongguo-drama 提交 `c884fab`，GPL-3.0。
- `src/server/native/app-source.js`：签名与 Spade 算法改编自 woshishiq1/drpys。

其他组件：

- 弹幕 `src/client/js/danmaku.dom.js`：MIT，Copyright (c) 2014 Zhenye Wei，全文在 `src/client/js/danmaku.LICENSE`。
- Vue：MIT，见 `src/client/js/vue.global.prod.js`。
- ByteVC2 解码器：见 `vendor/bytevc2/README.md`。补丁来自 wxyzh/ffmpeg-bvc2，应用到 jellyfin-ffmpeg。构建结果是 GPL-3.0-or-later 的 FFmpeg，并静态链接 x264。

AGPL-3.0 允许与 GPL-3.0 作品组合；上面标明 GPL-3.0-only 的文件仍按该声明理解。分发修改版时，包括通过网络提供修改后的程序，需要按 AGPL 提供对应源码。

## 内容版权

剧集、海报和弹幕的版权属于原权利人。本仓库不附带这些媒体文件。访问第三方服务可能涉及版权和服务条款。本文不提供解密、绕过试看或规避技术措施的步骤。权利人如有异议，请在本仓库提交 Issue。

`docs/hongguo-downloader-architecture.md` 引用的第三方文档许可以其原文为准。上游说明将该文档记为 CC BY-NC 4.0。本仓库没有纳入该项目的可执行源码。

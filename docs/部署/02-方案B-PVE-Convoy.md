# 方案 B：Proxmox VE + Convoy + Paymenter

## 它是什么

- **Proxmox VE（PVE）**：装在母鸡上的开源虚拟化系统，底层是 KVM，自带网页管理后台。开源免费（AGPL），付费订阅只是技术支持和企业更新源。
- **Convoy**：给 VPS 商家和客户用的面板，连接多台 PVE 母鸡，提供开关机、重装、VNC、IP 管理。界面和用法接近 Virtualizor。
- **Paymenter**：财务系统，自带 Convoy 对接。

## 授权和费用（注意）

- PVE：免费
- Convoy：源码公开，但**不是开源软件**。免费的个人版只能用于非生产、不赚钱的场景；**卖 VPS 必须买企业版，每台母鸡 $6/月**。企业版还附带 Windows、Ubuntu、Debian 等系统模板。
  - 价格页：https://convoypanel.com/pricing
  - 授权说明：https://convoypanel.com/docs/project/licensing
- Paymenter：免费（MIT）
- 测试阶段可以用 Convoy 免费个人版

## 整体结构

```
客户 → Paymenter（财务）
           ↓ API
       Convoy 面板（单独一台，Docker 运行）
           ↓ PVE API
       母鸡 1、母鸡 2……（装 Proxmox VE）
```

## 准备什么

- 母鸡：物理独立服务器，CPU 已开启虚拟化；除主 IP 外有一段给 VPS 用的 IP
- Convoy 服务器：一台 VPS，Ubuntu 20.04 及以上或 Debian 11 及以上（官方推荐 Ubuntu），2 核 4G 起
  - **不能装在 PVE 母鸡的宿主系统上**（官方明确说 PVE 的网络会和 Docker 冲突），但可以装在 PVE 上开的一台 KVM 虚拟机里
  - 不能装在容器里
- 财务服务器：按 `00-财务系统-Paymenter.md` 部署
- 官方文档：https://convoypanel.com/docs/project/introduction

官方提醒：Convoy 不是一键傻瓜软件，需要一定的 Linux 运维基础。新手建议全程让 AI 协助。

## 部署步骤

### 第 1 步：母鸡安装 Proxmox VE

1. 到 https://www.proxmox.com/downloads 下载 Proxmox VE 最新 ISO
2. 通过机房的 IPMI / 远程控制台挂载 ISO 安装（租的独服可以问商家能否代装 PVE）
3. 安装时设置主机名、主 IP、网关、root 密码
4. 安装完成后浏览器打开 `https://母鸡IP:8006`，用 root 登录

怎么验证：能进 PVE 后台，节点状态正常。

### 第 2 步：配置母鸡网络和存储

1. 网络：确认有一个网桥（默认叫 `vmbr0`），客户 VPS 通过它上网。租的独服先问清楚额外 IP 是路由方式还是要绑定虚拟 MAC
2. 存储：确认有放虚拟机硬盘的存储（默认 `local-lvm`）和放 ISO、备份的存储（默认 `local`）
3. 证书：Convoy 要求母鸡有**有效的 TLS 证书**，不建议关闭证书校验。PVE 可以在后台为母鸡的域名申请 Let's Encrypt 证书，所以这一步母鸡需要一个解析到它的域名（比如 `node1.你的域名`）

### 第 3 步：创建 PVE API Token

PVE 后台 → Datacenter（数据中心）→ Permissions（权限）→ API Tokens → Add：
- 用户选 root 权限的用户
- **取消勾选 Privilege Separation（权限分离）**
- 复制 Token ID 和 Secret，保存到 `/root/.secrets/.env`

### 第 4 步：安装 Convoy 面板

Convoy 用 Docker 运行。按官方 Getting Started 文档安装：https://convoypanel.com/docs/panel/v4/getting-started

让 AI 按官方文档完成：安装 Docker、下载 Convoy、配置环境文件、启动容器、创建管理员账号。

怎么验证：浏览器能打开 Convoy 后台并登录。

### 第 5 步：在 Convoy 添加母鸡

官方文档：https://convoypanel.com/docs/panel/v4/adding-a-node

1. 后台 Locations → Create Location，建一个机房位置（比如 HK1）
2. 后台 Nodes → Create Node，填：
   - Node Name In Proxmox：和 PVE 里的节点名一模一样
   - Token ID、Secret：第 3 步复制的
   - FQDN：母鸡的域名或 IP（不带 http/https），Port：8006
   - 内存、硬盘分配和超开比例
   - VM Storage、Backup Storage、ISO Storage：填 PVE 里的存储名
   - Network：网桥名，例如 `vmbr0`
3. 配置 IP 池（IPAM）：https://convoypanel.com/docs/panel/v4/configuring-ipam
4. 下载系统模板：https://convoypanel.com/docs/misc/download-vm-templates
5. 手动开一台测试 VPS，确认能联网、能登录

以后每加一台母鸡，重复第 1 到 3 步和第 5 步。

### 第 6 步：连接 Paymenter

官方文档：https://paymenter.org/docs/extensions/convoy

1. Convoy 后台创建 API Key（名字可以叫 Paymenter），保存好
2. Paymenter 后台 → 服务器，添加 Convoy，填 Convoy 网址和 API Key，点 Test Connection
3. 建商品，选择这台服务器并设置配置

### 第 7 步：流量额度和超额限速

Convoy 和 PVE 能统计流量、能限制网卡速率，但"月流量用完自动限速、每月重置"是否自带，要实际测试确认。没有的话，让 AI 写一个定时程序：读取每台 VPS 本月流量，超额后通过 PVE 或 Convoy API 降速，每月 1 日恢复。

### 第 8 步：完整测试

同方案 A：注册 → 充值 → 下单 → 自动开通 → 开关机、重装、VNC → 到期停机 → 流量超额限速。

## 常见问题

- Convoy 连不上母鸡：检查母鸡证书是否有效、Token 是否取消了权限分离、节点名是否和 PVE 完全一致
- Convoy 装在 PVE 宿主机上出现奇怪的网络错误：这是官方说明的已知问题，改装到单独的 VPS 或 PVE 里的虚拟机
- VPS 没网：检查网桥、IP 池和商家的 MAC 绑定要求

## 优缺点

- 优点：PVE 稳定成熟、资料多、免费；Convoy 体验接近 Virtualizor，每台母鸡授权比 Virtualizor 便宜（$6 对 $9）
- 缺点：Convoy 商用要付费，也不是真正开源；部署比方案 A 复杂（需要 Docker、母鸡证书）

# 方案 C：Apache CloudStack + 财务系统

## 它是什么

Apache CloudStack 是完全开源的云管理平台（Apache License 2.0），没有收费版，也没有授权费。它本身不是虚拟化软件，而是管理虚拟化的平台：底层用 KVM（也是开源），统一管理多台母鸡、IP、网络、存储、模板，并提供管理后台、用户界面和 API。

- 官网：https://cloudstack.apache.org
- 下载和版本说明：https://cloudstack.apache.org/downloads/
- 官方文档：https://docs.cloudstack.apache.org
- 软件包仓库：https://download.cloudstack.org （Ubuntu 22.04 jammy、24.04 noble 都有，当前最新是 4.23 系列）

## 费用

CloudStack 和 KVM 全部开源免费，不收授权费。财务系统可以选免费方案（要自己开发一部分），也可以买商业产品，见下一节。

## 财务系统怎么选（调研结果）

CloudStack 不带完整的财务系统，但自带一个 **Quota（配额计费）插件**，这点很关键：

- **CloudStack 自带 Quota 插件（免费）**：可以给每种资源设价格（运行中的虚拟机、IP、硬盘、模板、快照等，按月或按 GB），给账号充值"额度"（quotaCredit API），系统根据用量自动扣余额，余额低时发提醒邮件；开启强制模式后，余额不足的账号会被锁定，不能再新建资源，充值后解锁。它依赖 Usage Server（用量统计服务），默认关闭，需要手动开启
  - 文档：https://docs.cloudstack.apache.org/en/latest/plugins/quota.html
  - 缺少的是：客户注册页面、USDT 充值、商品购买页面。这部分可以让 AI 做一个轻量的"客户门户"：注册、USDT 充值（充值成功后调用 quotaCredit 给账号加额度）、跳转到 CloudStack 自带的用户界面开机
- **HostBill（商业）**：有官方 CloudStack 模块，支持自动开通，可以按小时或按实际用量计费。一次性买断授权，网上资料显示约 $599 起，每年约 $125 更新费，部分模块另外收费；以向 HostBill 询价为准
  - https://hostbillapp.com/feature/cloudstack-overview/
- **WHMCS（商业）**：有第三方 CloudStack 模块，按月付费
- **StackBill（商业）**：专门基于 CloudStack 的客户门户和计费平台（开通、计量、计费、客户管理），可对接 WHMCS 等。ShapeBlue 的案例资料提到有免费版，限制 25 台虚拟机
  - https://www.stackbill.com/stackbill-overview.html
- **StratoSTACK（开源）**：GitHub 上的 CloudStack 计费门户项目，但自助开机功能还标着"即将推出"，维护情况不明，只适合参考
  - https://github.com/obaviet/stratostack
- **Paymenter、FOSSBilling 等开源财务系统**：没有现成的 CloudStack 对接，要自己开发扩展

**建议：**
- 想零授权费、开发量最小：**CloudStack 自带 Quota 计费 + 自建轻量客户门户**。计费、扣费、欠费锁定都用 CloudStack 自带的，只需开发注册和 USDT 充值页面
- 想要传统"财务系统"体验（商品页、订单、工单、发票）：HostBill（花钱）或 Paymenter + 自研 CloudStack 扩展（免费，开发 1 到 2 周）
- 规模不大、想要现成门户：可以试试 StackBill 免费版

## 整体结构

```
客户 → 财务系统 / 客户门户（见上一节）
           ↓ CloudStack API
       CloudStack 管理服务器（主控）+ MySQL + NFS 二级存储
           ↓
       母鸡 1、母鸡 2……（KVM + cloudstack-agent）
```

## 先理解几个概念（新手必读）

- **区域（Zone）**：一个机房，比如"香港机房"
- **Pod**：机房里的一组机柜，小规模时一个就够
- **集群（Cluster）**：一组同类型的母鸡，比如都用 KVM
- **主机（Host）**：就是母鸡
- **主存储（Primary Storage）**：放虚拟机硬盘。小规模可以用母鸡本地硬盘
- **二级存储（Secondary Storage）**：放系统模板、ISO、快照，用 NFS 共享目录。可以先放在主控上
- **系统虚拟机**：CloudStack 自动创建的几台小虚拟机，负责控制台代理、模板下载等，正常现象
- **网络模式**：每台 VPS 直接分一个公网 IP 的话，一般用"共享网络"；如果要给客户做私有网络，就要用"高级网络"。让 AI 根据你的需求推荐

## 准备什么

- 主控：4 核 8G 起，硬盘 200GB 以上（要放二级存储），系统 Ubuntu 22.04 或 24.04，全新安装
- 母鸡：物理独立服务器，CPU 已开启虚拟化，系统和主控一致；有一段给 VPS 用的 IP
- 财务服务器或客户门户：单独一台，不要和 CloudStack 管理服务器装在同一台，避免端口冲突

## 部署步骤

具体命令以你所选版本的官方安装文档为准（Installation Guide），下面是流程和关键点。

### 第 1 步：选版本

在下载页确认用哪个版本。正式运营建议选 LTS（长期支持）版本，它会获得 18 个月的错误和安全修复。

### 第 2 步：主控安装数据库和管理服务

1. 添加 CloudStack 官方软件源（download.cloudstack.org 上对应系统和版本的仓库）
2. 安装 MySQL（按文档调整配置）
3. 安装管理服务：`cloudstack-management`
4. 初始化数据库：`cloudstack-setup-databases`（按文档带上数据库账号参数）
5. 完成设置：`cloudstack-setup-management`

怎么验证：浏览器打开 `http://主控IP:8080/client`，用默认管理员登录（默认账号见官方文档），**登录后马上修改默认密码**。

### 第 3 步：主控配置二级存储

1. 在主控上安装并配置 NFS 服务，建一个共享目录（例如 `/export/secondary`）
2. 按文档下载并导入"系统虚拟机模板"（System VM Template），版本要和 CloudStack 版本对应

### 第 4 步：母鸡安装 KVM 代理（后续步骤，有母鸡后做）

1. 母鸡装和主控相同的系统，检查 CPU 虚拟化：`egrep -c '(vmx|svm)' /proc/cpuinfo` 大于 0
2. 添加 CloudStack 软件源，安装 `cloudstack-agent`（会一起装好 KVM、QEMU、libvirt）
3. 按文档配置 libvirt 和网桥（客户 VPS 通过网桥上网）
4. 租的独服先问清楚额外 IP 是路由方式还是要绑定 MAC

母鸡不需要开发，只是安装和配置。

### 第 5 步：在后台建区域和添加母鸡

登录管理后台，按向导依次创建：区域 → 网络 → Pod → 集群（选 KVM）→ 主机（填母鸡 IP 和 root 密码）→ 主存储 → 二级存储（填主控的 NFS 地址）。

等系统虚拟机启动后，注册系统模板（Ubuntu、Debian 等），创建"计算方案"（CPU、内存）和"磁盘方案"，然后手动开一台测试 VPS，确认能联网。

### 第 6 步：接入财务（按你选的方案）

**方案一：Quota 计费 + 自建客户门户（免费）**
1. 开启 Usage Server 和 Quota 插件（全局设置里启用 quota，并开启强制模式 quota.enable.enforcement）
2. 用 updateQuotaTariff 给各种资源设置价格；设置余额提醒邮件
3. 让 AI 开发一个轻量客户门户：
   - 邮箱注册和验证，注册时通过 API 在 CloudStack 里创建对应的账号
   - USDT（TRC20）充值：充值成功后调用 quotaCredit 给账号加额度；回调必须校验签名、防止重复到账、以支付平台确认的金额为准，写日志
   - 显示余额、用量和流量；提供进入 CloudStack 用户界面开机和管理的入口
4. 开发前先让 AI 出方案，确认后再写；预计 1 到 2 周

**方案二：HostBill（商业）**
按 HostBill 的 CloudStack 模块说明添加 CloudStack 服务器（API 地址、API Key、Secret Key），建商品，选择计算方案、模板和网络。

**方案三：Paymenter + 自研扩展（免费）**
按 `00-财务系统-Paymenter.md` 部署 Paymenter，再让 AI 参照 Paymenter 自带的 Virtualizor 或 Convoy 扩展的结构，写一个 CloudStack 扩展：创建虚拟机、开关机、重启、重装、删除、到期停机、VNC 链接。预计 1 到 2 周。

无论哪种方案，都在 CloudStack 里单独建一个账号给财务系统用，生成 API Key 和 Secret Key，权限尽量小。

### 第 7 步：流量额度和超额限速（需要开发）

1. 启用 CloudStack 的 Usage Server（用量统计服务），确认能统计每台虚拟机的流量
2. 让 AI 写一个定时程序：读取每台 VPS 本月流量，超额后通过 API 调低网络速率，每月 1 日恢复，并在客户门户或财务系统里显示已用流量
3. 预计 3 到 7 天

### 第 8 步：完整测试

注册 → 充值 → 下单 → 自动开通 → 开关机、重装、VNC → 到期停机 → 流量超额限速。

## 常见问题

- 后台打不开：检查管理服务状态（`systemctl status cloudstack-management`）和防火墙 8080 端口
- 添加主机失败：检查母鸡 cloudstack-agent 是否运行、主控能否 SSH 到母鸡、CPU 虚拟化是否开启
- 系统虚拟机起不来：多半是二级存储 NFS 不通，或系统虚拟机模板版本不对
- VPS 没网：检查网桥和网络配置，以及商家的 MAC 绑定要求

## 优缺点

- 优点：完全开源，零授权费，可以随意修改；功能最强，以后能做成"云平台"（私有网络、负载均衡、快照、按量计费）
- 缺点：概念多、部署复杂；界面是"云控制台"风格，普通 VPS 客户用起来偏复杂；客户门户（或财务对接）和流量限速要自己开发，预计比方案 A 多 3 到 4 周

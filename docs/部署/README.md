# VPS 平台部署文档

这里有三套方案的部署文档，加上一份财务系统 Paymenter 的部署文档。人可以照着做，也可以把文档整份交给 AI（Claude Code）让它照着执行。

## 文档列表

1. `00-财务系统-Paymenter.md`：开源财务系统 Paymenter（注册、充值、下单、续费）。方案 A 直接用它；方案 B、C 也可以用，但要自己开发对接
2. `01-方案A-Virtualizor.md`：Virtualizor 面板，最快、最省事，按母鸡付授权费
3. `02-方案B-OpenNebula.md`：OpenNebula 云平台，社区版开源免费，架构比 CloudStack 简单
4. `03-方案C-CloudStack.md`：Apache CloudStack，完全开源免费，功能最强、最复杂

## 三套方案一句话对比

- 方案 A（Virtualizor）：商业软件。主控 $1/月，每台母鸡 $9/月。流量限速等功能自带；财务用 Paymenter，自带对接，开发量最小。
- 方案 B（OpenNebula）：社区版开源免费（企业版要订阅）。财务系统现成对接最好的是 HostBill（商业，一次性买断）；官方 WHMCS 模块只给企业版；用 Paymenter 等开源财务系统要自己开发对接。
- 方案 C（CloudStack）：完全开源，零授权费。自带 Quota 计费插件（按资源定价、充值额度、自动扣费、欠费锁定），可以只做一个轻量客户门户（注册加 USDT 充值）就开卖；也可以用 HostBill、StackBill 等商业产品，或 Paymenter 加自研扩展。

价格和功能是 2026 年 11 月从各官网和网上资料查到的，以官网最新为准。

## 各方案常用的财务系统（调研结果）

- Virtualizor：Paymenter（自带对接，免费）、WHMCS、HostBill、Blesta 等几乎都有现成模块
- OpenNebula：HostBill（2025 年 9 月起有官方模块，支持 VPS 和按量计费，包括流量）；WHMCS（官方模块，仅企业版）
- CloudStack：自带 Quota 计费插件；HostBill（官方模块）；WHMCS（第三方模块）；StackBill（专门的 CloudStack 门户，有限量免费版）
- Paymenter、FOSSBilling、Blesta 等开源财务系统：都没找到 OpenNebula 或 CloudStack 的现成对接

HostBill 是一次性买断授权，网上资料显示约 $599 起，之后每年约 $125 更新费，部分模块另收费，官方不公开价格，需要询价。

## 重要更正

之前聊天里说"Convoy 是开源的（MIT）"是错的：Convoy 是源码公开但不是开源，卖 VPS 要买企业授权（每台母鸡 $6/月）。方案 B 已改为 OpenNebula，不再使用 Convoy。

## 推荐顺序

1. 先测方案 A：最快看到完整业务流程（Virtualizor + Paymenter）
2. 再测方案 B 或 C：看零授权费的方案能否达到同样效果，以及要开发多少
3. 选定一套用于正式运营，其他测试环境删掉

## 通用约定（所有文档都适用）

- 测试阶段不用域名，全部用服务器 IP 访问
- 密码、密钥统一放在服务器的 `/root/.secrets/.env`，权限设为 600，不要发到聊天里，不要提交到 Git
- 每台机器都用全新安装的系统，不要预装宝塔等面板
- 主控、财务、母鸡尽量分开，不要装在同一台机器上
- 母鸡（跑客户 VPS 的物理服务器）必须是独立服务器，CPU 要支持并开启虚拟化（Intel VT-x / AMD-V）
- 检查 CPU 虚拟化的命令：`egrep -c '(vmx|svm)' /proc/cpuinfo`，结果大于 0 才能用

## 交给 AI 时怎么说

把对应文档整份复制给 Claude Code，再加一句：

```
请按这份文档帮我部署。我是新手：每一步先用简单中文告诉我要做什么、为什么；会修改系统、网络、防火墙或删除文件的命令，先等我确认再执行；以官方文档为准，文档里的命令如果和官方最新说明不一致，先告诉我；一次只做一个步骤，做完告诉我怎么验证。
```

推荐模型：Opus 5.5。

## 资料来源

- Virtualizor 价格：https://www.virtualizor.com/pricing
- Paymenter 文档：https://paymenter.org/docs/installation/install
- Convoy 授权说明：https://convoypanel.com/docs/project/licensing
- OpenNebula 计费集成：https://docs.opennebula.io/7.0/integrations/
- OpenNebula 与 HostBill：https://opennebula.io/blog/experiences/opennebula-meets-hostbill/
- OpenNebula 社区版说明：https://docs.opennebula.io/6.2/intro_release_notes/release_notes_community/what_is.html
- HostBill OpenNebula 模块：https://hostbillapp.com/feature/opennebula/
- HostBill CloudStack 模块：https://hostbillapp.com/feature/cloudstack-overview/
- CloudStack Quota 插件：https://docs.cloudstack.apache.org/en/latest/plugins/quota.html
- StackBill：https://www.stackbill.com/stackbill-overview.html
- StratoSTACK：https://github.com/obaviet/stratostack

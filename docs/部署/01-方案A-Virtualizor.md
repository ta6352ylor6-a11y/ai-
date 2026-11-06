# 方案 A：Virtualizor + Paymenter

## 它是什么

Virtualizor 是商业 VPS 面板（Softaculous 公司出品），底层用 KVM 虚拟化。一个主控统一管理多台母鸡；流量统计、月流量额度、超额限速、VNC、重装系统都是自带的。Paymenter 自带 Virtualizor 对接扩展。

- 官网：https://www.virtualizor.com
- 价格：https://www.virtualizor.com/pricing
- 授权管理：Softaculous 客户中心（左侧 virtualizor 菜单）

## 费用

- 主控专用授权（主控上不开 VPS）：$1/月
- 每台母鸡 Premium 授权：$9/月，或 $95/年，不限 VPS 数量
- 免费试用：15 天，每个账号每台服务器一次，按服务器 IP 发放
- 不需要 Professional 版（$18/月），基础功能 Premium 都有

## 整体结构

```
客户 → Paymenter（财务，单独一台）
           ↓ API
       Virtualizor 主控（单独一台，只做管理）
           ↓
       母鸡 1、母鸡 2……（物理独服，KVM）
```

## 准备什么

- 主控：一台 VPS 或服务器，2 核 4G 起，推荐 4 核 8G，40GB 以上；全新系统
- 母鸡：物理独立服务器，CPU 已开启虚拟化；除了主 IP，还要有一段给 VPS 用的 IP
- Softaculous 账号（用来申请试用和购买授权）
- 财务服务器：按 `00-财务系统-Paymenter.md` 部署

## 部署步骤

### 第 1 步：确认系统版本

到 Virtualizor 官方安装文档（官网 Docs → Install Virtualizor）确认当前支持的系统版本，常见的是 AlmaLinux / Rocky Linux 8、9 和 Ubuntu。主控和母鸡都装官方支持的版本。

### 第 2 步：申请授权

Softaculous 客户中心 → virtualizor → Virtualizor Trial，在 Server IP 填主控的公网 IP，点 Get Trial。

- 在主控上执行 `curl -4 ifconfig.me`，看到的 IP 就是要填的
- 试用 15 天从申请时开始算，准备好马上要安装时再申请
- 每台服务器只能试用一次，填错了无法重来

正式使用时：Purchase Virtualizor 购买，Add License 把授权绑定到 IP。

### 第 3 步：安装主控

按官方文档里"Master Server（主控）"一节的安装方式，安装"只做主控、不开 VPS"的版本。官方 KVM 安装的通用命令形如：

```bash
wget -N http://files.virtualizor.com/install.sh
chmod 0755 install.sh
./install.sh email=你的邮箱 kernel=kvm
```

只装主控时的参数，以官方 Master Server 文档为准，装之前让 AI 先查清楚。

安装完成后：
- 管理后台：`https://主控IP:4085`（HTTP 是 4084）
- 客户面板：`https://主控IP:4083`（HTTP 是 4082）
- 防火墙放行 4082 到 4085
- 浏览器提示证书不安全是正常的（自签名证书），测试阶段点继续访问即可

怎么验证：能登录管理后台，后台显示授权有效。

### 第 4 步：添加母鸡（后续步骤，买 $9 授权后做）

1. 母鸡装官方支持的系统，检查 CPU 虚拟化：`egrep -c '(vmx|svm)' /proc/cpuinfo` 大于 0
2. 在 Softaculous 为母鸡 IP 购买 Premium 授权
3. 在母鸡上运行 Virtualizor 安装脚本（kernel=kvm）
4. 在主控后台添加服务器（Add Server），填母鸡 IP 和密钥，按提示完成
5. 配置网桥和 IP 池（IP Pool），录入给 VPS 用的 IP 段、网关、子网掩码
6. 下载系统模板（OS Templates）：Ubuntu、Debian、AlmaLinux 等
7. 在后台手动开一台测试 VPS，确认能联网、能 SSH 登录

如果母鸡是租的别家独服，先问清楚商家：额外 IP 是"路由到服务器"还是"要绑定虚拟 MAC"，这决定网络怎么配。

### 第 5 步：建 VPS 套餐

后台 Plans → Add Plan，设置：CPU 核数、内存、硬盘、带宽（端口速率）、月流量额度、超额后的限速。

### 第 6 步：连接 Paymenter

1. Virtualizor 后台 → Configuration → Server Info，复制 Key 和 Key Pass，保存到 `/root/.secrets/.env`
2. Paymenter 后台 → 服务器（Servers），添加 Virtualizor，填主控地址、Key、Key Pass，点 Test Connection 测试连接
3. Paymenter 后台建商品（Product），选择这台服务器和对应的 Virtualizor 套餐
4. 商品设置里可以填开通邮件模板，把 VPS 的 IP 和 root 密码发给客户（官方文档：https://paymenter.org/docs/extensions/virtualizor）

### 第 7 步：完整测试

用一个测试客户账号走一遍：注册 → 邮箱验证 → 充值 → 下单 → 自动开通 → 收到开通邮件 → 客户中心开关机、重装 → 到期停机（可以临时把到期时间改短来测）。

流量限速测试：把测试套餐的月流量临时调很低，在 VPS 里跑流量，确认超额后自动限速。

## 常见问题

- 后台打不开：检查防火墙是否放行 4085；`systemctl status virtualizor` 看服务状态
- 显示没有授权：到 Softaculous 客户中心 My Licenses 确认授权绑定的 IP 和主控出口 IP 一致
- VPS 没网：多半是网桥或 IP 池配置不对，或者商家额外 IP 需要绑定 MAC
- Paymenter 测试连接失败：检查 Key / Key Pass，检查主控防火墙是否允许财务服务器访问 4085

## 优缺点

- 优点：功能现成，开发量最小，加母鸡方式和魔方类似
- 缺点：闭源，不能改面板代码，只能通过 API 和主题扩展；按母鸡持续付费

# 财务系统：Paymenter（三套方案共用）

## 它是什么

Paymenter 是开源的财务和销售系统，用来替代 WHMCS 或魔方财务。客户在这里注册、充值、下单、续费，管理员在后台管理商品、订单和客户。它本身不管虚拟机，而是通过"扩展"去调用 VPS 面板（Virtualizor、Convoy 等）自动开通。

- 官网：https://paymenter.org
- 官方安装文档：https://paymenter.org/docs/installation/install
- 授权：MIT 开源，免费

## 准备什么

- 一台服务器（可以是 VPS）：2 核 4G 起，推荐 4 核 8G，40GB 以上硬盘
- 系统：Ubuntu 22.04 或 24.04（官方还支持 Debian 11/12/13、CentOS 8/9，不支持 Windows）
- 一个能发信的 SMTP 邮箱（注册验证、到期提醒要用）

## 部署步骤

下面的命令以 Ubuntu 24.04 为例，全部在财务服务器上用 root 执行。

### 第 1 步：安装依赖

```bash
apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
curl -sSL https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version="mariadb-10.11"
apt update
apt -y install php8.3 php8.3-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip,intl,redis} mariadb-server nginx tar unzip git redis-server
```

怎么验证：`php -v` 显示 8.3，`systemctl status mariadb nginx redis-server` 都是 active。

### 第 2 步：下载 Paymenter

```bash
mkdir /var/www/paymenter
cd /var/www/paymenter
curl -Lo paymenter.tar.gz https://github.com/paymenter/paymenter/releases/latest/download/paymenter.tar.gz
tar -xzvf paymenter.tar.gz
chmod -R 755 storage/* bootstrap/cache/
```

### 第 3 步：创建数据库

把 `你的数据库密码` 换成一个强密码，并记到 `/root/.secrets/.env`。

```bash
mysql -u root -p
```

进入数据库后执行：

```sql
CREATE USER 'paymenter'@'127.0.0.1' IDENTIFIED BY '你的数据库密码';
CREATE DATABASE paymenter;
GRANT ALL PRIVILEGES ON paymenter.* TO 'paymenter'@'127.0.0.1' WITH GRANT OPTION;
quit
```

### 第 4 步：配置和初始化

```bash
cd /var/www/paymenter
cp .env.example .env
php artisan key:generate --force
php artisan storage:link
```

**重要：** `.env` 里的 `APP_KEY` 是加密密钥，丢了以后加密数据无法恢复，即使有数据库备份也没用。一定要另外备份一份，不要只放在服务器上。

用 `nano .env` 修改数据库信息：

```
DB_DATABASE=paymenter
DB_USERNAME=paymenter
DB_PASSWORD=你的数据库密码
```

初始化数据库（耗时较长，不要中途退出）：

```bash
php artisan migrate --force --seed
php artisan db:seed --class=CustomPropertySeeder
php artisan app:init
php artisan app:user:create
```

`app:init` 会问网站网址，测试阶段填 `http://你的服务器IP`。`app:user:create` 用来创建你的管理员账号。

### 第 5 步：定时任务和队列

定时任务（负责到期停机、发提醒等）：

```bash
sudo crontab -u www-data -e
```

加入这一行：

```
* * * * * php /var/www/paymenter/artisan schedule:run >> /dev/null 2>&1
```

队列服务（负责发邮件、开通 VPS 等后台任务）：新建文件 `/etc/systemd/system/paymenter.service`，内容：

```ini
[Unit]
Description=Paymenter Queue Worker

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/paymenter/artisan queue:work
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

启动：

```bash
sudo systemctl enable --now paymenter.service
sudo systemctl enable --now redis-server
```

### 第 6 步：配置 Nginx

按官方文档 https://paymenter.org/docs/installation/webserver 配置 Nginx。测试阶段 `server_name` 填服务器 IP，先不配 HTTPS。

怎么验证：浏览器打开 `http://你的服务器IP`，能看到 Paymenter 首页，用管理员账号能登录后台。

### 第 7 步：基础设置

在后台完成：
- 邮件（SMTP）设置，并发一封测试邮件
- 开启注册邮箱验证
- 网站名称、货币（USD 或你要的币种）
- 语言和界面翻译，缺的翻译可以让 AI 补

## 连接 VPS 面板

各方案文档里会写具体做法。Paymenter 自带的服务器扩展有：Virtualizor、Convoy、VirtFusion，以及 cPanel、DirectAdmin、Plesk、Enhance、Pterodactyl。直连 Proxmox 的扩展是付费的，没有 CloudStack 扩展。

## USDT 充值（需要开发）

Paymenter 自带的支付只有 Stripe、PayPal、Mollie，没有加密货币。可以：

1. 先看扩展市场 https://paymenter.org/marketplace 有没有现成的加密货币支付插件
2. 没有的话让 AI 开发一个，可以对接第三方平台（NOWPayments、Cryptomus 等），也可以对接自建的 epusdt

给 AI 的要求：参照 Paymenter 自带的 Stripe 扩展的结构写成独立扩展；支持 USDT TRC20；回调必须校验签名、防止重复到账、以支付平台确认的金额为准；所有回调写日志；先用测试网或小额测试。

## 常见问题

- 页面打不开：检查 Nginx 是否运行（`systemctl status nginx`），防火墙是否放行 80 端口
- 邮件发不出去：检查 SMTP 设置；检查队列服务是否运行（`systemctl status paymenter`）
- 下单后不开通：查看 `storage/logs/` 里的日志，以及后台的扩展连接测试
- 升级 Paymenter：按 https://paymenter.org/docs/installation/updating 操作，升级前先备份数据库和 `.env`

## 备份

每天备份两样东西：数据库（`mysqldump paymenter`）和 `/var/www/paymenter/.env`。最好再复制一份到别的机器上。

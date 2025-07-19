# 后端服务（测试目标）

这是订单管理系统的后端 API 服务，**仅作为 API 测试的学习目标**，使用 Node.js + Express + MySQL 构建。

## 📋 项目说明

⚠️ **重要提示**: 本后端服务仅作为 API 测试的学习目标，**不是学习后端开发的重点**。

后端服务提供完整的订单管理 API，用于：
- API 测试练习
- 测试用例验证
- 学习接口测试技能

## 🏗️ 技术栈

- **运行时**: Node.js
- **Web 框架**: Express.js
- **数据库**: MySQL
- **HTTP 客户端**: Superagent

## 🚀 快速启动

### 安装依赖

```bash
npm install
# 或者使用 yarn
yarn install
```

### 启动服务

```bash
npm start
# 或者使用 yarn
yarn start
```

服务将在 `http://localhost:8083` 启动。

## 📁 项目结构

```
back-end/
├── README.md                    # 项目文档
├── app.js                       # 应用入口文件
├── package.json                 # 项目配置
├── startup.sh                   # 启动脚本
└── src/                         # 源代码目录
    ├── orders/                  # 订单模块
    │   ├── index.js             # 订单路由
    │   └── service.js           # 订单业务逻辑
    ├── stores/                  # 库存模块
    │   └── service.js           # 库存业务逻辑
    ├── common/                  # 公共模块
    │   └── db.js                # 数据库连接
    └── env/                     # 环境配置
        └── config.js            # 配置文件
```

## 🧪 API 接口（测试目标）

### 订单管理

#### 获取订单列表

```http
GET /orders
```

**响应示例**:
```json
[
  {
    "order_id": 1,
    "product_id": 1,
    "amount": 1,
    "total_price": 100,
    "name": "Iphone 11"
  }
]
```

#### 获取订单详情

```http
GET /orders/:orderId
```

**参数**:
- `orderId` (number): 订单ID

**响应示例**:
```json
{
  "order_id": 1,
  "product_id": 1,
  "amount": 1,
  "total_price": 100,
  "name": "Iphone 11"
}
```

#### 创建订单

```http
POST /orders
```

**请求体**:
```json
{
  "product_id": 1,
  "amount": 5
}
```

**响应示例**:
```json
{
  "order_id": 5
}
```

#### 删除订单

```http
DELETE /orders/:orderId
```

**参数**:
- `orderId` (number): 订单ID

**响应示例**:
```json
{}
```

## 🔧 配置说明

### 环境变量

- `NODE_ENV`: 运行环境 (dev/prod)
- `PORT`: 服务端口 (默认: 8083)

### 数据库配置

数据库配置在 `src/env/config.js` 中：

```javascript
module.exports = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'example',
  database: 'web-api-test'
};
```

## 🗄️ 数据库设计

### 产品表 (products)

| 字段 | 类型 | 说明 |
|------|------|------|
| product_id | INT | 产品ID (主键) |
| name | VARCHAR | 产品名称 |
| price | DECIMAL | 产品价格 |

### 订单表 (orders)

| 字段 | 类型 | 说明 |
|------|------|------|
| order_id | INT | 订单ID (主键) |
| product_id | INT | 产品ID (外键) |
| amount | INT | 数量 |
| total_price | DECIMAL | 总价 |

## 🔄 业务流程

### 创建订单流程

1. 接收订单创建请求
2. 验证请求参数
3. 调用库存服务锁定库存
4. 计算订单总价
5. 保存订单到数据库
6. 返回订单ID

### 错误处理

- **400**: 请求参数错误
- **404**: 资源不存在
- **500**: 服务器内部错误

## 🧪 测试相关

### 手动测试

使用 curl 命令测试 API：

```bash
# 获取订单列表
curl http://localhost:8083/orders

# 创建订单
curl -X POST http://localhost:8083/orders \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1, "amount": 5}'

# 获取订单详情
curl http://localhost:8083/orders/1

# 删除订单
curl -X DELETE http://localhost:8083/orders/1
```

### 自动化测试

使用项目根目录下的 API 测试套件：

```bash
cd ../api-test
npm test
```

## 🐛 常见问题

### 1. 数据库连接失败

- 检查 MySQL 服务是否启动
- 验证数据库配置是否正确
- 确认数据库和表是否存在

### 2. 端口被占用

```bash
# 查看端口占用
lsof -i :8083

# 杀死占用进程
kill -9 <PID>
```

### 3. 依赖安装失败

```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

## 📚 相关资源

- [Express.js 官方文档](https://expressjs.com/)
- [MySQL2 文档](https://github.com/sidorares/node-mysql2)
- [Superagent 文档](https://visionmedia.github.io/superagent/)

---

**重要提醒**: 本后端服务仅作为 API 测试的学习目标。学习重点应放在 `../api-test/` 目录中的 API 测试技能上，而不是后端开发。 
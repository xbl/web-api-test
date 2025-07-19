# API 测试项目

这是一个专为初学者设计的接口测试演示和练习项目，通过实际的订单系统 API 来学习接口测试的基础知识和最佳实践。

## 📋 项目概述

本项目包含一个完整的订单管理系统，包括：
- **后端服务**: Node.js + Express + MySQL
- **Mock 服务**: 库存锁定模拟服务
- **API 测试**: 使用 Newman (Postman CLI) 进行自动化测试

## 🏗️ 系统架构

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   API Test  │    │  Back-end   │    │ Mock Server │
│  (Newman)   │───▶│  (Express)  │───▶│ (Inventory) │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │   MySQL     │
                   │  Database   │
                   └─────────────┘
```

## 🧪 测试场景

### 1. 订单详情测试 (`订单详情`)
- **获取订单列表** (`GET /orders`)
  - 验证状态码为 200
  - 验证返回的订单列表格式正确
  - 验证每个订单都包含 `order_id` 字段且为数字类型
  - 自动提取第一个订单的 ID 用于后续测试

- **获取订单详情** (`GET /orders/{orderId}`)
  - 验证状态码为 200
  - 验证返回的订单详情包含正确的 `order_id`
  - 验证订单 ID 与请求参数一致

### 2. 创建订单测试 (`创建订单`)
- **创建订单** (`POST /orders`)
  - 请求体: `{"product_id": 1, "amount": 10}`
  - 验证状态码为 200
  - 验证返回的订单 ID 为数字类型
  - 自动保存订单 ID 用于后续验证

- **验证创建结果** (`GET /orders/{orderId}`)
  - 验证新创建的订单能够正确获取
  - 验证订单 ID 与创建时返回的一致

### 3. 删除订单测试 (`删除订单`)
- **创建测试订单** (`POST /orders`)
  - 先创建一个订单用于删除测试
  - 保存订单 ID 用于删除操作

- **删除订单** (`DELETE /orders/{orderId}`)
  - 验证状态码为 200
  - 验证删除操作返回正确的响应格式

### 4. 订单列表测试 (`获取订单列表`)
- **获取所有订单** (`GET /orders`)
  - 验证状态码为 200
  - 验证返回的订单列表格式
  - 验证每个订单都包含必要的字段

## 🚀 快速开始

### 前置条件
1. 确保 Docker 已启动
2. 确保后端服务正在运行
3. 确保 Mock 服务正在运行

### 运行测试

1. **安装依赖**
```bash
npm install
```

2. **运行所有测试**
```bash
npm test
```

3. **手动运行测试**
```bash
node index.js -f ./test -e ./local.environments.json
```

## 📁 项目结构

```
api-test/
├── README.md                    # 项目说明文档
├── package.json                 # 项目依赖配置
├── index.js                     # 测试运行器
├── local.environments.json      # 本地环境配置
└── test/                        # 测试集合目录
    ├── 订单系统.postman_collection.json      # 主要测试集合
    ├── 订单系统2.postman_collection.json     # 备用测试集合
    ├── 订单系统_完整测试.postman_collection.json  # 完整测试场景集合
    └── test-data.json           # 测试数据文件

└── test-templates.md            # 测试用例模板文档
```

## ⚙️ 配置说明

### 环境配置 (`local.environments.json`)
```json
{
  "id": "de997016-fb8e-412e-a430-35d3a44da3a3",
  "name": "local",
  "values": [
    {
      "key": "host",
      "value": "localhost:8083",
      "enabled": true
    }
  ]
}
```

### 测试运行器 (`index.js`)
- 自动扫描 `test/` 目录下的所有 `.json` 文件
- 合并多个 Postman 集合
- 使用 Newman 执行测试
- 支持环境变量配置

## 🎯 学习目标

通过本项目的练习，初学者将学会：

1. **接口测试基础**
   - HTTP 请求方法 (GET, POST, DELETE)
   - 状态码验证
   - 响应数据验证

2. **测试自动化**
   - 使用 Newman 进行命令行测试
   - 测试脚本编写
   - 测试数据管理

3. **测试场景设计**
   - 正向测试用例
   - 数据流测试
   - 端到端测试

4. **测试最佳实践**
   - 测试用例组织
   - 环境配置管理
   - 测试报告分析

## 🔧 扩展练习

### 1. 添加更多测试场景
- 库存不足时的订单创建测试
- 无效订单 ID 的错误处理测试
- 边界值测试 (数量为 0、负数等)
- 数据驱动测试 (使用 `test-data.json`)

### 2. 性能测试
- 使用 Newman 的并发测试功能
- 添加响应时间验证
- 压力测试场景

### 3. 数据驱动测试
- 使用 `test-data.json` 进行参数化测试
- 不同产品 ID 的测试
- 不同订单数量的测试
- 边界值和错误场景测试

### 4. 集成测试
- 与 Mock 服务的集成测试
- 数据库状态验证
- 事务完整性测试

## 📊 测试报告

运行测试后，你将看到类似以下的输出：
```
newman

订单系统

→ 获取订单列表
  GET http://localhost:8083/orders [200 OK, 1.2KB, 45ms]
  ✓ Status code is 200
  ✓ 验证返回订单内容

→ 获取订单详情
  GET http://localhost:8083/orders/1 [200 OK, 234B, 12ms]
  ✓ Status code is 200
  ✓ 订单详情是否包含订单id且id 为数字

...

collection run complete!
```

## 🐛 常见问题

### 1. 连接失败
- 检查后端服务是否启动 (端口 8083)
- 检查 Mock 服务是否启动
- 检查 Docker 容器状态

### 2. 测试失败
- 检查数据库连接
- 验证测试数据是否正确
- 查看后端服务日志

### 3. 环境配置问题
- 确认 `local.environments.json` 中的 host 配置正确
- 检查端口是否被占用

### 4. 测试结果说明
- **基础功能测试**: 应该全部通过
- **边界值测试**: 可能失败，因为后端 API 对某些边界值处理不同
- **错误处理测试**: 可能失败，因为后端 API 的错误处理逻辑与测试期望不同
- 这些失败是正常的，帮助了解实际 API 的行为

## 📚 相关资源

- [Newman 官方文档](https://learning.postman.com/docs/running-collections/using-newman-cli/)
- [Postman 测试脚本](https://learning.postman.com/docs/writing-scripts/test-scripts/)
- [Express.js 官方文档](https://expressjs.com/)
- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [测试用例模板](test-templates.md) - 详细的测试用例编写指南

---

**注意**: 这是一个教学项目，适合初学者学习接口测试的基础概念和实践。在实际工作中，请根据具体项目需求调整测试策略和工具选择。

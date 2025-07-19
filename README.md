# WEB API 测试项目

这是一个完整的 Web API 测试学习项目，专为初学者设计，重点学习 API 测试技能。

## 📋 项目概述

本项目是一个订单管理系统的 API 测试学习环境，包含：

- **完整的测试环境**: 包含后端服务、Mock 服务和数据库
- **API 测试套件**: 使用 Newman (Postman CLI) 的自动化测试
- **测试场景覆盖**: 基础功能测试、错误处理、边界测试等
- **学习资源**: 详细的测试模板和文档

## 🎯 学习目标

通过本项目的练习，初学者将学会：

1. **API 测试基础**
   - 接口测试概念和流程
   - HTTP 协议和状态码理解
   - 请求和响应验证方法

2. **测试工具使用**
   - Postman 集合创建和管理
   - Newman 命令行测试执行
   - 测试环境配置和管理

3. **测试用例设计**
   - 功能测试用例设计
   - 错误场景测试
   - 边界值测试
   - 数据驱动测试

4. **测试实践技能**
   - 测试数据管理
   - 测试结果分析
   - 缺陷报告编写
   - 测试流程优化

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

## 🚀 快速开始

### 前置条件

- Node.js (推荐 v16 或更高版本)
- Docker 和 Docker Compose
- npm 或 yarn

### 1. 启动测试环境

数据库会自动初始化测试数据：

```bash
docker-compose up -d
```

### 2. 启动 Mock 服务

Mock 服务模拟库存锁定功能：

```bash
cd ./mock-server
npm install
npm start
```

### 3. 启动后端服务

后端 API 服务（用于测试目标）：

```bash
cd ./back-end
npm install
npm start
```

### 4. 运行 API 测试

```bash
cd ./api-test
npm install
npm test
```

## 📁 项目结构

```
web-api-test/
├── README.md                    # 项目主文档
├── docker-compose.yml           # Docker 配置
├── scripts/                     # 数据库脚本
│   ├── mysql_create_table.sql   # 表结构创建
│   └── mysql_insert_order.sql   # 测试数据插入
├── back-end/                    # 后端服务（测试目标）
│   ├── README.md                # 后端文档
│   ├── app.js                   # 应用入口
│   ├── package.json             # 依赖配置
│   └── src/                     # 源代码
├── mock-server/                 # Mock 服务
│   ├── controller/              # 控制器
│   ├── raml/                    # API 定义
│   └── package.json
└── api-test/                    # API 测试套件（重点）
    ├── README.md                # 测试文档
    ├── test/                    # 测试集合
    │   ├── 订单系统.postman_collection.json
    │   └── 订单系统2.postman_collection.json
    ├── test-templates.md        # 测试模板
    ├── index.js                 # 测试执行器
    ├── local.environments.json  # 环境配置
    └── package.json
```

## 🧪 API 测试内容

### 测试接口

- `GET /orders` - 获取订单列表
- `GET /orders/:id` - 获取订单详情
- `POST /orders` - 创建新订单
- `DELETE /orders/:id` - 删除订单

### 测试场景

1. **基础功能测试**
   - 正常创建订单
   - 正常查询订单列表
   - 正常查询订单详情
   - 正常删除订单

2. **错误处理测试**
   - 无效的产品ID
   - 无效的订单ID
   - 缺少必要参数
   - 参数类型错误

3. **边界值测试**
   - 数量为0的订单
   - 数量为负数的订单
   - 不存在的产品ID
   - 不存在的订单ID

4. **数据验证测试**
   - 响应状态码验证
   - 响应数据结构验证
   - 响应数据内容验证

## 🔧 测试配置

### 环境配置

- **后端服务端口**: 8083
- **Mock 服务端口**: 8084
- **测试环境**: local.environments.json

### 测试数据

数据库预置了测试数据：
- 4个测试产品
- 4个测试订单

## 📚 学习资源

### 测试模板

参考 `api-test/test-templates.md` 了解各种测试类型：

- 基础功能测试
- 错误处理测试
- 边界值测试
- 数据驱动测试

### 测试集合

- `订单系统.postman_collection.json`: 基础功能测试
- `订单系统2.postman_collection.json`: 扩展测试场景

## 🎓 学习路径

### 第一阶段：环境搭建
1. 启动所有服务
2. 验证环境正常
3. 运行基础测试

### 第二阶段：理解测试
1. 查看测试集合结构
2. 理解测试用例设计
3. 分析测试结果

### 第三阶段：实践练习
1. 修改现有测试用例
2. 添加新的测试场景
3. 创建自定义测试集合

### 第四阶段：进阶学习
1. 学习测试数据管理
2. 掌握环境变量使用
3. 了解测试报告分析

## 🔧 开发指南

### 添加新的测试用例

1. 在 `api-test/test/` 下创建新的测试集合
2. 在 `api-test/index.js` 中注册新集合
3. 更新 `api-test/README.md`

### 修改测试环境

编辑 `api-test/local.environments.json`：

```json
{
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

### 扩展测试场景

参考 `api-test/test-templates.md` 中的模板，创建新的测试类型。

## 🐛 常见问题

### 1. 测试环境启动失败

```bash
# 检查 Docker 容器状态
docker-compose ps

# 查看容器日志
docker-compose logs mysql

# 重新启动容器
docker-compose restart
```

### 2. 测试执行失败

- 确保所有服务都已启动
- 检查端口配置是否正确
- 查看后端服务日志

### 3. 测试结果异常

某些测试失败是预期的，用于学习目的：
- 边界测试可能返回 500 错误
- 错误处理测试验证异常情况

### 4. 依赖安装问题

```bash
# 清理 node_modules
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install
```

## 📚 相关资源

- [Postman 官方文档](https://learning.postman.com/)
- [Newman 官方文档](https://learning.postman.com/docs/running-collections/using-newman-cli/)
- [API 测试最佳实践](https://www.postman.com/collection/guide/)
- [HTTP 状态码参考](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

**注意**: 这是一个教学项目，专为初学者学习 API 测试而设计。后端服务仅作为测试目标，重点在于掌握 API 测试技能。

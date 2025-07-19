# API 测试用例模板

本文档提供了各种 API 测试用例的模板，帮助初学者学习如何编写有效的测试。

## 1. 基础功能测试模板

### GET 请求测试
```javascript
pm.test("状态码验证", function () {
    pm.response.to.have.status(200);
});

pm.test("响应时间验证", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("响应格式验证", function () {
    pm.response.to.be.json;
});

pm.test("数据结构验证", function () {
    var response = pm.response.json();
    pm.expect(response).to.be.an('array');

    if (response.length > 0) {
        response.forEach(function(item) {
            pm.expect(item).to.have.property('id');
            pm.expect(item.id).to.be.a('number');
        });
    }
});
```

### POST 请求测试
```javascript
pm.test("创建成功验证", function () {
    pm.response.to.have.status(201);
});

pm.test("返回数据验证", function () {
    var response = pm.response.json();
    pm.expect(response).to.have.property('id');
    pm.expect(response.id).to.be.a('number');

    // 保存ID用于后续测试
    pm.variables.set("createdId", response.id);
});

pm.test("数据完整性验证", function () {
    var response = pm.response.json();
    var requestData = JSON.parse(pm.request.body.raw);

    pm.expect(response.name).to.eql(requestData.name);
    pm.expect(response.email).to.eql(requestData.email);
});
```

## 2. 错误处理测试模板

### 400 错误测试
```javascript
pm.test("状态码应该是 400", function () {
    pm.response.to.have.status(400);
});

pm.test("错误信息验证", function () {
    var response = pm.response.json();
    pm.expect(response).to.have.property('error');
    pm.expect(response.error).to.include('Invalid input');
});
```

### 404 错误测试
```javascript
pm.test("状态码应该是 404", function () {
    pm.response.to.have.status(404);
});

pm.test("资源不存在验证", function () {
    var response = pm.response.json();
    pm.expect(response).to.have.property('message');
    pm.expect(response.message).to.include('not found');
});
```

### 500 错误测试
```javascript
pm.test("状态码应该是 500", function () {
    pm.response.to.have.status(500);
});

pm.test("服务器错误验证", function () {
    var response = pm.response.json();
    pm.expect(response).to.have.property('error');
    pm.expect(response.error).to.include('Internal server error');
});
```

## 3. 边界值测试模板

### 数值边界测试
```javascript
pm.test("最小值测试", function () {
    pm.response.to.have.status(200);
    var response = pm.response.json();
    pm.expect(response.value).to.be.above(0);
});

pm.test("最大值测试", function () {
    pm.response.to.have.status(200);
    var response = pm.response.json();
    pm.expect(response.value).to.be.below(1000000);
});
```

### 字符串边界测试
```javascript
pm.test("空字符串测试", function () {
    pm.response.to.have.status(400);
});

pm.test("超长字符串测试", function () {
    pm.response.to.have.status(400);
    var response = pm.response.json();
    pm.expect(response.error).to.include('too long');
});
```

## 4. 数据验证测试模板

### 必填字段验证
```javascript
pm.test("缺少必填字段", function () {
    pm.response.to.have.status(400);
    var response = pm.response.json();
    pm.expect(response.errors).to.include('name is required');
});
```

### 数据类型验证
```javascript
pm.test("数据类型验证", function () {
    pm.response.to.have.status(400);
    var response = pm.response.json();
    pm.expect(response.error).to.include('must be a number');
});
```

### 格式验证
```javascript
pm.test("邮箱格式验证", function () {
    pm.response.to.have.status(400);
    var response = pm.response.json();
    pm.expect(response.error).to.include('invalid email format');
});
```

## 5. 业务逻辑测试模板

### 状态转换测试
```javascript
pm.test("状态转换验证", function () {
    var response = pm.response.json();
    var previousStatus = pm.variables.get("previousStatus");

    pm.expect(response.status).to.not.eql(previousStatus);
    pm.expect(response.status).to.be.oneOf(['pending', 'processing', 'completed']);
});
```

### 权限验证测试
```javascript
pm.test("权限验证", function () {
    pm.response.to.have.status(403);
    var response = pm.response.json();
    pm.expect(response.error).to.include('permission denied');
});
```

### 数据一致性测试
```javascript
pm.test("数据一致性验证", function () {
    var response = pm.response.json();
    var requestData = JSON.parse(pm.request.body.raw);

    // 验证计算逻辑
    pm.expect(response.total).to.eql(requestData.quantity * requestData.price);
});
```

## 6. 响应时间测试模板

### 基础响应时间测试
```javascript
pm.test("响应时间应该在可接受范围内", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

## 7. 安全测试模板

### 输入验证测试
```javascript
pm.test("SQL注入防护", function () {
    pm.response.to.have.status(400);
    var response = pm.response.json();
    pm.expect(response.error).to.include('invalid input');
});

pm.test("XSS防护", function () {
    var response = pm.response.json();
    pm.expect(response.content).to.not.include('<script>');
});
```

## 8. 集成测试模板

### 端到端测试
```javascript
pm.test("完整业务流程验证", function () {
    // 1. 创建资源
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
    var createResponse = pm.response.json();
    pm.variables.set("resourceId", createResponse.id);

    // 2. 获取资源
    pm.sendRequest({
        url: pm.variables.get("baseUrl") + "/resources/" + pm.variables.get("resourceId"),
        method: 'GET'
    }, function (err, response) {
        pm.expect(response.code).to.eql(200);
        pm.expect(response.json().id).to.eql(createResponse.id);
    });

    // 3. 更新资源
    pm.sendRequest({
        url: pm.variables.get("baseUrl") + "/resources/" + pm.variables.get("resourceId"),
        method: 'PUT',
        header: { 'Content-Type': 'application/json' },
        body: { name: 'updated name' }
    }, function (err, response) {
        pm.expect(response.code).to.eql(200);
    });

    // 4. 删除资源
    pm.sendRequest({
        url: pm.variables.get("baseUrl") + "/resources/" + pm.variables.get("resourceId"),
        method: 'DELETE'
    }, function (err, response) {
        pm.expect(response.code).to.eql(200);
    });
});
```

## 9. 环境变量使用模板

### 动态数据测试
```javascript
// 在 Pre-request Script 中设置变量
pm.variables.set("timestamp", new Date().getTime());
pm.variables.set("randomId", Math.floor(Math.random() * 1000));

// 在 Tests 中使用变量
pm.test("动态数据验证", function () {
    var response = pm.response.json();
    pm.expect(response.timestamp).to.eql(pm.variables.get("timestamp"));
});
```

## 10. 测试数据管理模板

### 数据清理
```javascript
// 在 Pre-request Script 中清理测试数据
pm.sendRequest({
    url: pm.variables.get("baseUrl") + "/test-data/cleanup",
    method: 'POST'
});

// 在 Tests 中验证清理结果
pm.test("测试数据已清理", function () {
    pm.sendRequest({
        url: pm.variables.get("baseUrl") + "/test-data",
        method: 'GET'
    }, function (err, response) {
        pm.expect(response.json().length).to.eql(0);
    });
});
```

## 使用建议

1. **选择合适的模板**: 根据测试目标选择相应的模板
2. **自定义验证逻辑**: 根据具体业务需求调整验证规则
3. **保持测试独立性**: 每个测试用例应该能够独立运行
4. **使用描述性名称**: 测试名称应该清楚地描述测试目的
5. **添加适当的断言**: 确保测试覆盖所有重要的验证点
6. **管理测试数据**: 使用环境变量和集合变量管理测试数据
7. **定期维护**: 随着API变化及时更新测试用例

## 最佳实践

- 使用 `pm.expect()` 进行断言，提供清晰的错误信息
- 在测试脚本中添加注释，说明测试逻辑
- 使用环境变量管理不同环境的配置
- 定期运行测试，确保API的稳定性
- 记录测试结果，分析失败原因
- 与开发团队协作，及时了解API变化

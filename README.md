# WEB API TEST

## 启动

MySQL 数据库启动

```shell
docker-compose up
```

需要 nodejs 运行环境和java 环境。


数据初始化
```
http://localhost:3000/sqlbear/mysql_create_table
http://localhost:3000/sqlbear/mysql_insert_order

# 清理数据
http://localhost:3000/sqlbear/mysql_delete_order

http://localhost:3000/sqlbear/mysql_drop_table
```


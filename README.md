# WEB API TEST

## 启动

1. MySQL 数据库启动会自动初始化数据

```shell
docker-compose up
```

2. 启动 mock server，作为锁库存的挡板

```shell
cd ./mock-server
npm start
```

3. 启动 app 

```shell
cd ./back-end
npm start
```

导出 post 脚本到`test/src`目录下

```shell
cd ./test
npm test
```


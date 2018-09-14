# sequelize、KOA 搭建 Node 环境

- 安装 sequelize，sequelize-cli，KOA

- 新建 index.js 文件搭建 Koa

- 建立.sequelizerc 文件进行相关配置(touch .sequelizerc)

```
const path = require('path')

module.exports = {
    'config': path.resolve('./app/config','index.js'),
    'migrations-path': path.resolve('./app','migrations'),
    'models-path': path.resolve('./app','models'),
    'seeders-path': path.resolve('./app','seeders'),
}
```

- 编写 config 文件相关 sql 信息

- 使用 koa-generator

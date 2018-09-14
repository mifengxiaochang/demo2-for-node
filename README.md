# sequelize、KOA 搭建 Node环境

- 安装sequelize，sequelize-cli，KOA

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

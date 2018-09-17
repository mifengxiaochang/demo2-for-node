# sequelize、KOA 搭建 Node 服务器环境

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

```
 dialect: "mysql",
    username: "admin",
    password: "admin",
    database: "demo_node",
    host: "127.0.0.1",
    define: {
      timestamps: false,
      underscored: true,
      underscoredAll: true,
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci"
      }
    },
    dialectOptions: {
      chartset: "utf8mb4"
    },
    modelPath: path.join(__dirname, "../models/"), //返回models  ,__dirname表示当前运行环境绝对路径
    pool: {
      // mysql连接池
      max: 5,
      idle: 30000,
      acquire: 60000
    }
```

- 使用 koa-generator（也可以不用）

- 通过 koa-orm 操作数据库

```
const orm = require("koa-orm")(config.database);//相关的配置参数
app.use(orm.middleware);
```

在配置的相关 models 文件中编写建立模型

- 建立多层路由

```
const Router = require("koa-router");
const router = new Router();

//模块化
router.get("/", homeController.welcome);
```

- 获取请求参数

在 koa 中，获取 GET 请求数据源头是 koa 中 request 对象中的 query 方法或 querystring 方法，query 返回是格式化好的参数对象，querystring 返回的是请求字符串，由于 ctx 对 request 的 API 有直接引用的方式，所以获取 GET 请求数据有两个途径。

1. 是从上下文中直接获取

请求对象 ctx.query，返回如 { a:1, b:2 }
请求字符串 ctx.querystring，返回如 a=1&b=2

2. 是从上下文的 request 对象中获取

请求对象 ctx.request.query，返回如 { a:1, b:2 }
请求字符串 ctx.request.querystring，返回如 a=1&b=2

对于 POST 请求的处理，koa2 没有封装获取参数的方法。所以获取 Post 请求需要以下步骤：

1. 解析上下文 ctx 中的原生 node.js 对象 req。
2. 将 POST 表单数据解析成 query string 字符串.(例如:user=buppt&age=24)
3. 将字符串转换成 JSON 格式。

- 在 middlewares 文件夹中配置了常用 response 返回值

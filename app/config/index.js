const path = require("path");

//database
const configs = {
  development: {
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
    modelPath: path.join(__dirname, "../models/"), //返回 models  ,__dirname表示当前运行环境绝对路径
    pool: {
      // mysql连接池
      max: 5,
      idle: 30000,
      acquire: 60000
    }
  },
  test: {
    username: "admin",
    password: "admin",
    database: "demo_node",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "admin",
    password: "admin",
    database: "demo_node",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};

module.exports = configs;

/*
注释版
  // 数据库的 sql 方言
  // 当前已支持: 'mysql', 'sqlite', 'postgres', 'mssql'
  dialect: 'mysql',
  
  // 自定义主机; 默认值: localhost
  host: 'my.server.tld',
  // 对于 postgres，你还可以指定包含 UNIX 套接字的目录的绝对路径，
  // 来通过 host: '/sockets/psql_sockets' 进行连接。
 
  // 自定义端口; 默认值: 依据 dialect 默认
  port: 12345,
 
  // 自定义协议，默认值: 'tcp'
  // 仅限 postgres, 用于 Heroku
  protocol: null,
 
  // 禁用日志; 默认值: console.log
  logging: false,
  
  // 你还可以将任何方言选项传递到底层方言库
  // - 默认是空
  // - 当前支持: 'mysql', 'postgres', 'mssql'
  dialectOptions: {
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
 
  // sqlite 的存储引擎
  // - 默认值 ':memory:'
  storage: 'path/to/database.sqlite',
 
  // 禁止将未定义的值插入为NULL
  // - 默认值: false
  omitNull: true,
 
  // 是否使用本地库的标志
  // 如果是 'pg' -- 设置为 true 将允许 SSL 支持
  // - 默认值: false
  native: true,
 
  // 指定在调用 sequelize.define 时使用的选项
  // 如下示例:
  //   define: { timestamps: false }
  // 这基本等同于:
  //   sequelize.define(name, attributes, { timestamps: false })
  // 没有必要像这样去定义每个模型的时间戳选项
  define: {
    underscored: false
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
 
  // 类似于同步：你可以定义始终强制同步模型
  sync: { force: true },
 
  // 用于数据库连接池的池配置
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },

  // 每个事务的隔离级别. 
  // 默认为 dialect 默认
  isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
})*/

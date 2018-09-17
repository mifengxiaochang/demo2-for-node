const Koa = require("koa");
const config = require("./config");
const responseHandler = require("./middlewares/responseConfig");
const router = require("./routes");

const app = new Koa();

console.log("-------database-------");
const orm = require("koa-orm")(config.development); // 用orm操作数据库

app.use(orm.middleware);
app.use(responseHandler());
app.use(router.routes());

console.log("--------routes finsh------");
app.listen(3000, () => {
  console.log("starting at port 3000");
});

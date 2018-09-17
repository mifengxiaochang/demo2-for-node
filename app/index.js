const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const config = require("./config");
const responseHandler = require("./middlewares/responseConfig");
const router = require("./routes");

const app = new Koa();

console.log("-------database-------");
const orm = require("koa-orm")(config.development); // 用orm操作数据库

//koa-bodyparser 中间件可以把 koa2 上下文的 formData 数据解析到 ctx.request.body 中
app.use(
  bodyParser({
    enableTypes: ["json", "form"],
    formLimit: "10mb",
    jsonLimit: "10mb"
  })
);

app.use(orm.middleware);
app.use(responseHandler());
app.use(router.routes());
app.on("error", onError);

console.log("--------routes finsh------");
app.listen(3000, () => {
  console.log("starting at port 3000");
});

function onError(err) {
  if (apm.active) apm.captureError(err);
  logger.error(
    {
      err,
      event: "error"
    },
    "Unhandled exception occured"
  );
}

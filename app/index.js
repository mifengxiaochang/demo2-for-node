const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
  ctx.body = "hello koa2";
});

app.listen(4321);
console.log("koa2 is starting at port 3000");

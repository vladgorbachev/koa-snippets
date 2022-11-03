const Koa = require('koa');
const app = new Koa();
const {rateLimitMiddleware} = require("./middleware/rate-limit")


app.use(rateLimitMiddleware)
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
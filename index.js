const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const database = require('./database')

const app = new Koa()
const router = new Router()
app.use(cors())
app.use(bodyParser())

router.get('/public/getSlider', ctx => {
    console.log(ctx.path, '有请求进来了')
    ctx.body = {
        code: 0,
        data: [
            {
                id: 1,
                name: 'wp'
            },
            {
                id: 2,
                name: 'nn'
            }
        ]
    }
})

router.post('/user/registry', async ctx => {
    console.log(ctx.path, '有注册进来')
    let { password, username } = ctx.request.body;

    database.addUser(username, password)  ?
    ctx.body = { code: 0, data: '注册成功' } :
    ctx.body = { code: 1, data: '用户名已存在' }
})

router.post('/user/login', async (ctx) => {
    console.log(ctx.path, '有登录进来')

    let { password, username } = ctx.request.body;

    database.queryUser(username, password)  ?
    ctx.body = { code: 0, data: '登录成功' } :
    ctx.body = { code: 1, data: '账号密码不正确' }
})

router.get('/', ctx => {
    console.log('有请求进来了')
    // ctx.type = 'application/pdf'
    ctx.set('Content-type', 'application/pdf')
    ctx.body = fs.createReadStream(path.resolve(__dirname, 'PCA.pdf'))
})

app.use(router.routes())
app.listen(8080)
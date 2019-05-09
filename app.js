var createError = require('http-errors');
var express = require('express');//express框架
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//mongoDB数据库
var ejs=require('ejs');//ejs渲染模板
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//路由
var loginRouter = require('./routes/login');
var app = express();
var session=require('express-session');//后台的cookie,保存用户数据
app.use(session({
    secret:'keyboard cat',//可以随便写
    // name:'session_id',//表示保存在本地的cookie名字，默认connect.sid
    resave:false,//强制保存session，建议false
    saveUninitialized:true,//强制将未初始化的session存储,建议true
    cookie:{
        maxAge:1000*30*60//过期时间
    },//secure https这样才能访问cookie
    //设置过期时间比如是30分钟，如果用户30分钟内一直访问，最后一次访问结束后的30分钟后再过期
    rolling:true//在每次请求时强行设置cookie,这将重置cookie过期时间

}))
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));//默认资源查找路径，静态路由托管
app.use('/login', loginRouter);//登陆界面
app.use('/users', usersRouter);//用户信息界面

app.listen(3000,'127.0.0.1');
module.exports = app;//模块暴露

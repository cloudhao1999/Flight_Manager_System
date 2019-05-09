var express = require('express');
var router = express.Router();//托管路由（分路由）
var bodyParser=require('body-parser');//一个类cookie模块
router.use(bodyParser.urlencoded({ extended: false }))
var md5=require('md5-node');//MD5加密模块
/* GET home page. */
var DB=require('C:\\Users\\i\\WebstormProjects\\Flight_Manage_System\\modules\\db.js');//引入自定义封装好的数据库模块
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/doLogin',function (req,res) {//接受post请求并检索数据库用户信息达到登陆验证
  var username=req.body.username;//获取post来的信息
  var password=md5(req.body.password);//用户密码加密
  // console.log(username);
  // console.log(password);
//1.获取数据
// 2.链接数据库查询数据
  DB.find('user',{username:username,password:password},function (err,data) {
    if(data.length>0){
      console.log("登陆成功");
      //保存用户信息
      req.session.userinfo=data[0];
      res.send("登陆成功");
    }else{
      // console.log("登陆失败");
      console.log(err);
      res.send("<script>alert('登录失败');location.href='/login'</script>");
    }

  })
})
module.exports = router;

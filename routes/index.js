var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var list=["1","2","3"];
  res.render('index',{list:list});
});

module.exports = router;
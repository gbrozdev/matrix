var express = require('express');
var router = express.Router();
var db = require('../connection')
var fun = require('../functions')


/* GET users listing. */

router.get('/', function(req, res) {
  res.render('admin');
});
router.get('/signup',(req,res)=>{
  res.render('signup')
})
router.post('/signup',(req,res)=>{
  fun.doSignup(req.body).then((user)=>{
    console.log(user);
    res.redirect('/users/login')
  })

})
router.get('/login',  function(req, res) {
  res.render('login');
});

router.post('/login',(req,res)=>{
  fun.doLogin(req.body).then((user)=>{
    console.log(user);
    res.redirect('index')
  })
})
module.exports = router;
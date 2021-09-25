var express = require('express');
var router = express.Router();
var db = require('../connection')
var fun = require('../functions')


/* GET users listing. */

router.get('/', function(req, res) {
  res.render('index');
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
    res.redirect('/')
  })
})
module.exports = router;
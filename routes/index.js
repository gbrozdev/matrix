var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});
router.get('/notes',  function(req, res) {
    res.render('notes/notes');
});
router.get('/passwords',  function(req, res) {
    res.render('passwords/passwords');
});
router.get('/find',  function(req, res) {
    res.render('find/find');
});
router.get('/links',  function(req, res) {
    res.render('links/links');
});


module.exports = router;

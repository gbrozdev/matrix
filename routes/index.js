var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId
/* GET home page. */
router.get('/', async function(req, res) {
    res.render('index');
});


module.exports = router;

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
router.get('/newnote',  function(req, res) {
    res.render('notes/newnote');
});
router.post('/newnote',  function(req, res) {
    console.log(req.body);
    var note = req.body
    note.time = new Date().toLocaleTimeString()
    note.date = new Date().toLocaleDateString()
    console.log(note);
    db.get().collection('notes').insertOne(note).then((res)=>{
        console.log(res.insertedId);
    })
    res.render('notes/notes');
});


module.exports = router;

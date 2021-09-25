var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId

/* GET home page. */
router.get('/', function(req, res) {
    let user = req.session.user
    console.log(user);
    if (user) {
        res.render('index',{user});
    }
    else{
        res.render('signup');
    }
});
router.get('/notes', async function(req, res) {
    let notes = await db.get().collection('notes').find().toArray()  
    res.render('notes/notes',{notes});
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

router.get('/products', async function(req, res) {
    let products = await db.get().collection('products').find().toArray() 
    res.render('products/products',{products});
});
router.get('/products/:id', async function(req, res) {
    console.log(req.params);
    let id = req.params.id
    let product = await db.get().collection('products').findOne({_id:ObjectId(id)})
    res.render('products/productlist',{product});
});

router.get('/newnote',  function(req, res) {
    res.render('notes/newnote');
});
router.post('/newnote',  function(req, res) {
    console.log(req.body);
    let note = req.body
    note.time = new Date().toLocaleTimeString()
    note.date = new Date().toLocaleDateString()
    console.log(note);
    db.get().collection('notes').insertOne(note).then(async (response)=>{
        let id = response.insertedId
        let note = await db.get().collection('notes').findOne({_id:ObjectId(id)})        
        res.render('notes/note',{note} );
    })
});
router.get('/newproduct',  function(req, res) {
    res.render('products/newproduct');
});
router.post('/newproduct',  function(req, res) {
    let product = req.body;
    db.get().collection('products').insertOne(product).then(async(response)=>{
        let id = response.insertedId
        let product = await db.get().collection('products').findOne({_id:ObjectId(id)})        
        res.render('products/productlist',{product} );
    })
});
router.get('/note/:id', async function(req, res) {
    let id = req.params.id
    let note = await db.get().collection('notes').findOne({_id:ObjectId(id)})   
    res.render('notes/note',{note});
});

router.post('/search', async function(req, res) {
    var content = req.body.search
    let notes = await db.get().collection('notes').findOne({title:content})
    console.log(notes);
    if (notes) {
        res.render('notes/notes',{notes,search:true})      
    } else {
        let notes = await db.get().collection('notes').find().toArray()  
        res.render('notes/notes',{notes,err:true});
        }
});
module.exports = router;

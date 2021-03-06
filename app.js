const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
mongoose.connect('mongodb+srv://gopalgoyal012:Gopal@1234#@cluster0.48ehi.mongodb.net/contactDance',{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>
console.log("Connected successfully")).catch((err)=>
console.log(err)); 
const port  = process.env.PORT || 8000;

//for serving static file
app.use('/static',express.static('static')) 
// app.use(express.urlencoded())
app.use(bodyParser.json());

//define mongoose schema
var contactSchema = new mongoose.Schema({                          //making a schema
    name: String,
    age: String,
    email: String,
    contactno: String
});

//making schema to model
var contact = mongoose.model('dancecontact' , contactSchema);   

//set the template engine as pug
app.set('view engine','pug')

//set the view directory
app.set('views',path.join(__dirname,'views'))  

//endpoint
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
})
app.get('/aboutus',(req,res)=>{
    const params = {};
    res.status(200).render('aboutus.pug',params); 
})
app.get('/services',(req,res)=>{
    const params = {};
    res.status(200).render('services.pug',params);
})
app.get('/gallery',(req,res)=>{
    const params = {};
    res.status(200).render('gallery.pug',params);
})
app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item is saved to our db")
    }).catch(()=>{
        res.status(400).send("item was not saved to our db")
    })
    
})

app.listen(port,()=>{
    console.log(`the application started at port ${port}`); 
})

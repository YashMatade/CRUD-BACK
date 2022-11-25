var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var app = express();

app.use(express.json());

app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));


mongoose.connect("mongodb://localhost:27017/companydb");
var db = mongoose.connection;
db.on('open',()=>{
    console.log('connection successful');
});
db.on('err',(err)=>{
    console.log(err);
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/employee',require('./routes/employee'));

app.get('/',(req,res)=>{
    res.send("hello");
});

app.listen(8081,()=>{
    console.log("server running on 8081");
});
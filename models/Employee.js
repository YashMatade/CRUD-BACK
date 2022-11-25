var mongoose = require('mongoose');
var Schema = mongoose.Schema
let schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phoneno:{type:String,required:true}
})

let Employee = mongoose.model("employees",schema);

module.exports = Employee;


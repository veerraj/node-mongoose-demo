const mongoose = require('mongoose');
const schema = mongoose.Schema;


const companySchema = new schema({
     name:{
         type:String,
         required:true
     },
     address:{
         type:String,
         required:true
     },
     type_of_comapny:{
        type:String,
        required:true
     },
     description:{
         type:String,
         required:true
     },
     website_url:{
         type:String,
         required:true
     },
     revenue:{
        type:Number,
        required:true
    },
}, {
    timestamps:{
        createdAt:'created_at',
        updatedAt:'update_at'
    }
 })

module.exports = mongoose.model('company',companySchema);


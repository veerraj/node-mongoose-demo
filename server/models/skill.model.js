const mongoose = require('mongoose');
const schema = mongoose.Schema;


const skillShcema = new schema({
     name:{
         type:String,
         required:true
     }
  }, {
    timestamps:{
        createdAt:'created_at',
        updatedAt:'update_at'
    }
 })

module.exports = mongoose.model('skill',skillShcema);


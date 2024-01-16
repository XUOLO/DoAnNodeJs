var mongoose = require("mongoose");
 
const schema = new mongoose.Schema({
     
    name: String,
    age: Number,
    address:String,
    gender:String,
    class_k:{
        type:mongoose.Schema.ObjectId,
        ref:'classRoom'
    },
    phone:Number,
    parentName:String,
    image: String,
    test15:Number,
    test45:Number,
    terms:Number,
    AOS:Number,
});
 

schema.virtual('classRoom', {
    ref: 'classRoom',
    localField: 'class_k',
    foreignField: '_id',
    justOne: true
  });

module.exports = mongoose.model('student', schema);
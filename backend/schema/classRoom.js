var mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    teacherName: String,
    user_k:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
});

schema.virtual('student',{
    ref:'student',
    localField:'_id',   
    foreignField:'class_k'
});
schema.virtual('user', {
    ref: 'user',
    localField: 'user_k',
    foreignField: '_id',
   });
schema.set('toJSON',{virtuals:true});
schema.set('toObject',{virtuals:true});

module.exports = mongoose.model('classRoom', schema);
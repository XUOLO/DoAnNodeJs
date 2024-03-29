var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const configs = require('../helper/configs')
const crypto = require('crypto'); 
const schema = new mongoose.Schema({
    email: String,
    userName: String,
    name:String,
    password: String,
    role: String,
    class_k:{
        type:mongoose.Schema.ObjectId,
        ref:'classRoom'
    },
    avatar:String,
    tokenForgot:String,
    tokenForgotExp:String,
});
schema.virtual('classRoom', {
    ref: 'classRoom',
    localField: 'class_k',
    foreignField: '_id',
    justOne: true
  });
schema.pre('save', function () {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    //bug sinh ra khi change password
})

schema.methods.getJWT = function () {
    var token = jwt.sign({ id: this._id }, configs.SECRET_KEY,
        { expiresIn: configs.EXP });
    return token;
}
schema.methods.addTokenForgotPassword= function(){
    var tokenForgot = crypto.randomBytes(31).toString('hex');
    this.tokenForgot = tokenForgot;
    this.tokenForgotExp = Date.now()+15*60*1000;
    return tokenForgot;
}
schema.statics.checkLogin = async function (userName, password) {
    if (!userName || !password) {
        return { err: 'Hay nhap day du username va password' };
    }
    var user = await this.findOne({userName:userName});
    if (!user) {
        return { err: 'userName khong ton tai' };
    }
    var result = bcrypt.compareSync(password, user.password);
    if (!result) {
        return { err: 'password sai' };
    }
     return user;
}
//JWT

module.exports = mongoose.model('user', schema);
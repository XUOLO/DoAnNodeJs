var express = require('express');
const { model } = require('mongoose');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelUser = require('../models/user')
var validate = require('../validates/user')
const {validationResult} = require('express-validator');
var Schemauser = require('../schema/user');
 const { checkLogin, checkRoleAdmin, checkRegister } = require('../middlewares/protect');



router.get('/count', async function (req, res, next) {
  try {
    const count = await Schemauser.countDocuments();
    responseData.responseReturn(res, 200, true, count);
  } catch (err) {
    responseData.responseReturn(res, 500, false, err);
  }
});

router.get('/', async function (req, res, next) {
  console.log(req.query);
  var usersAll = await modelUser.getall(req.query);
  responseData.responseReturn(res, 200, true, usersAll);
 

});
router.get('/teacherList', async function (req, res, next) {

  var result = await checkLogin(req);
  if(result.err){
    responseData.responseReturn(res, 400, true, result.err);
    return;
  }
  console.log(result+"haha");
  req.userID = result;
  next();
},async function(req, res, next){
   await checkRoleAdmin(req, res, next);
}, async function (req, res, next) { 


  console.log(req.query);
  var usersAll = await Schemauser.find({role:"user"});
  responseData.responseReturn(res, 200, true, usersAll);
 

});

router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var user = await modelUser.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.post('/add',validate.validator(),
  async function (req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
      responseData.responseReturn(res, 400, false, errors.array().map(error=>error.msg));
      return;
    }
  var user = await modelUser.getByName(req.body.userName);
  if (user) {
    responseData.responseReturn(res, 404, false, "user da ton tai");
  } else {
   
    const newUser = await modelUser.createUser({
      userName: req.body.userName,
      email: req.body.email,
      name:req.body.name,
      password: req.body.password,
 
    })
    
    responseData.responseReturn(res, 200, true, newUser);
  }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    var user = await modelUser.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.delete('/delete/:id', async function (req, res, next) {//delete by Id
  try {
     await modelUser.delete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});


router.get('/search/:key', async (req, res) => {
  try {
    const searchKey = req.params.key;
    const result = await Schemauser.find({
      $or: [
        { userName: { $regex: searchKey, $options: 'i' } },
        { role: { $regex: searchKey, $options: 'i' } }
      ]
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/searchUsers/:key', async (req, res) => {
  try {
    const searchKey = req.params.key;
    const result = await Schemauser.find({role:"user",
      $or: [
        { name: { $regex: searchKey, $options: 'i' } },
        { email: { $regex: searchKey, $options: 'i' } }
      ]
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
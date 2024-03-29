const { body } = require('express-validator');
const message = require('../helper/message');

const options = {
  name: {
    min: 3,
    max: 20
  },
  parentName: {
    min: 3,
    max: 20
  },
  address: {
    min: 3,
    max: 200
  },
  gender:['Male','Female']
};
 
module.exports = {
  validator: function () {
    return [
      body('name')
        .trim()
        .notEmpty()
        .withMessage('Tên không được để trống')
        .isLength({ min: options.name.min, max: options.name.max })
        .withMessage(`Tên phải có độ dài từ ${options.name.min} đến ${options.name.max} ký tự`),
        body('parentName')
        .trim()
        .notEmpty()
        .withMessage('Tên phụ huynh không được để trống')
        .isLength({ min: options.parentName.min, max: options.parentName.max })
        .withMessage(`Tên phụ huynh phải có độ dài từ ${options.parentName.min} đến ${options.parentName.max} ký tự`),

      body('address')
        .trim()
        .notEmpty()
        .withMessage('Địa chỉ không được để trống')
        .isLength({ min: options.address.min, max: options.address.max })
        .withMessage(`Địa chỉ phải có độ dài từ ${options.address.min} đến ${options.address.max} ký tự`),

      body('age')
        .trim()
        .notEmpty()
        .withMessage('Tuổi không được để trống')
        .isNumeric()
        .withMessage('Tuổi phải là một số'),

        body('phone')
        .trim()
        .notEmpty()
        .withMessage('Tuổi không được để trống')
        .isNumeric()
        .withMessage('Tuổi phải là một số'),
        
    ];
  }
};
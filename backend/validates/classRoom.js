const { body } = require('express-validator');
const message = require('../helper/message');

const options = {
   teacherName: {
     min: 1,
     max: 30
   },
   name: {
     min: 1,
     max: 10
   }
};

module.exports = {
   validator: function () {
     return [
       body('name')
         .trim()
         .notEmpty()
         .withMessage('Class name cannot be empty')
         .isLength({ min: options.name.min, max: options.name.max })
         .withMessage(`Class name must be from ${options.name.min} to ${options.name.max} characters in length`),

       body('teacherName')
         .trim()
         .notEmpty()
         .withMessage('Teacher name cannot be blank')
         .isLength({ min: options.teacherName.min, max: options.teacherName.max })
         .withMessage(`Teacher name must be from ${options.teacherName.min} to ${options.teacherName.max} characters in length`)
     ];
   }
};
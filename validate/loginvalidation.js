const Joi=require('joi')

const userValidate = Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Invalid email',
        'any.required': 'Email is required'
      }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(20)
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password length should be minimum 8 characters',
        'string.max': 'Password length should be maximum 20 characters',
        'string.pattern':"at least 2 charactor,symbol,num",
        'any.required': 'Password is required'
      })
  });
module.exports=userValidate
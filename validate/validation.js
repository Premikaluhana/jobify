const Joi=require('joi')

const userValidate = Joi.object({
    Name: Joi.string().required().min(3).max(20)
      .messages({
        'string.base': 'name must be a string',
        'string.empty': 'name cannot be empty',
        'string.min': 'name length should be minimum 3 characters',
        'string.max': 'name length should be maximum 20 characters',
        'any.required': 'name is required'
      }),Lastname: Joi.string().required().min(3).max(20)
      .messages({
        'string.base': 'lastname must be a string',
        'string.empty': 'lastname cannot be empty',
        'string.min': 'lastname length should be minimum 3 characters',
        'string.max': 'lastname length should be maximum 20 characters',
        'any.required': 'lastname is required'
      }),Location: Joi.string().required().min(3).max(40)
      .messages({
        'string.base': 'Location must be a string',
        'string.empty': 'Location cannot be empty',
        'string.min': 'Location length should be minimum 3 characters',
        'string.max': 'Location length should be maximum 40 characters',
        'any.required': 'location is required'
      }),
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
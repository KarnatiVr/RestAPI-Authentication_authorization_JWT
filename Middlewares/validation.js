const Joi=require('@hapi/joi')

const registerValidation= function(data){
    const schema= Joi.object({
        name: Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    return schema.validate(data)
}
const LoginValidation= function(data){
    const schema= Joi.object({
        name: Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    return schema.validate(data)
}

module.exports= {registerValidation,LoginValidation}
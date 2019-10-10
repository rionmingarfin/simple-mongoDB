"use strict"

const joi  = require('joi');

module.exports = {
    validateBody : user => {
        return (req,res,next) =>{
            const schemas = joi.object().keys({
                email : joi.string().email().required(),
                password : joi.string().required()
            })
            
            const result =  joi.validate(user,schemas)
            if (result.error) {
                return res.status(404).json(result.error)
            }else{
                res.json({});
                next();
            }
        }
        }
    }
    
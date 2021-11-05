const Joi = require('joi');
const { joiResponse } = require("../helper/validation")
const { actionType } = require('../enum')
module.exports.userAddValidation = (req, res, next) => {
    const { body } = req;
    const schema = Joi.object().keys({
        'name': Joi.string().trim().label('name').min(3),
        'country': Joi.string().label('country').min(3).optional().allow(''),
        'joinDate': Joi.date().label('joinDate'),
        'point': Joi.number().min(0).label('point').optional(),
        'units': Joi.number().min(0).label('units').optional(),
        "actionType": Joi.string().label("actionType").optional().valid(...Object.values(actionType)),
    }).options({ abortEarly: false, allowUnknown: false });

    const result = schema.validate(body);
    joiResponse(result, res, next);
};






module.exports.userPointValidation = (req, res, next) => {
    const { body } = req;

    const schema = Joi.object().keys({
        'point': Joi.number().min(0).label('point')
    }).options({ abortEarly: false, allowUnknown: false });
    const result = schema.validate(body);
    joiResponse(result, res, next);

};



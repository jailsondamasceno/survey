import * as Joi from 'joi';

export const validateSurvey = (data: any) => {
    const schema = Joi.object({
        targetAudience: Joi.string().required(),
        questions: Joi.array().items(
            Joi.object({
                questionText: Joi.string().required(),
                required: Joi.boolean().default(true)
            })
        ).min(3).required()
    });

    return schema.validate(data);
};
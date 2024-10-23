import * as Joi from 'joi';

export const validateResponse = (data: any) => {
    const schema = Joi.object({
        surveyId: Joi.string().required(),
        targetAudience: Joi.string().required(),
        stars: Joi.number().min(1).max(5).required(),
        email: Joi.string().email().required(),
        answers: Joi.array().items(
            Joi.object({
                questionId: Joi.string().required(),
                answer: Joi.string().required()
            })
        ).required()
    });

    return schema.validate(data);
};
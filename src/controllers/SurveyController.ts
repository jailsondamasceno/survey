import { Request, Response } from 'express';
import Survey from '../models/Survey';
import { validateSurvey } from '../validators/surveyValidator';

export class SurveyController {
    async create(req: Request, res: Response) {
        try {
            const { error } = validateSurvey(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const survey = new Survey(req.body);
            const savedSurvey = await survey.save();
            return res.status(201).json(savedSurvey);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { error } = validateSurvey(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const survey = await Survey.findById(id);
            if (!survey) return res.status(404).json({ error: 'Survey not found' });

            Object.assign(survey, req.body);
            survey.updatedAt = new Date();
            await survey.save();

            return res.json(survey);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async listSurvey(req: Request, res: Response) {
        try {

            const page = Number(req.query.page) || 1;
            const limit = Math.max(Number(req.query.limit) || 10, 10);
            const skip = (page - 1) * limit;


            const surveys = await Survey.find({})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec();

            const total = await Survey.countDocuments();

            return res.json({
                data: surveys,
                metadata: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    timestamp: new Date()
                }
            });

        } catch (error) {
            console.error('Erro ao listar surveys:', error);
            return res.status(500).json({
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async surveyById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const survey = await Survey.findById(id).lean().exec();
            if (!survey) {

                return res.status(404).json({ error: 'Survey not found' });
            }

            return res.json(survey);
        } catch (error) {
            console.error('Erro ao buscar survey por ID:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

}
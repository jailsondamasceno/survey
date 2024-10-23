import { Request, Response } from 'express';
import SurveyResponse from '../models/Response';
import Survey from '../models/Survey';
import { validateResponse } from '../validators/responseValidator';

export class ResponseController {
    async create(req: Request, res: Response) {
        try {
            const { error } = validateResponse(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const survey = await Survey.findById(req.body.surveyId);
            if (!survey) return res.status(404).json({ error: 'Survey not found' });

            const response = new SurveyResponse(req.body);
            await response.save();

            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async listByTargetAudience(req: Request, res: Response) {
        try {
            const { targetAudience } = req.params;
            const { sort } = req.query;

            const sortOrder = sort === 'desc' ? -1 : 1;

            const responses = await SurveyResponse.find({ targetAudience })
                .sort({ stars: sortOrder });


            return res.json(responses);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

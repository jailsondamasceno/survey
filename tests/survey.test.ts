import { SurveyController } from '../src/controllers/SurveyController';
import Survey from '../src/models/Survey';
import { Request, Response } from 'express';
import { validateSurvey } from '../src/validators/surveyValidator';

// Mock do módulo de validação
jest.mock('../src/validators/surveyValidator', () => ({
    validateSurvey: jest.fn().mockReturnValue({ error: null })
}));

// Mock do modelo Survey
jest.mock('../src/models/Survey', () => {
    return jest.fn().mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({
            _id: 'mockId',
            title: 'Test Survey',
            targetAudience: 'Geeks',
            questions: [
                { questionText: 'Question 1', required: true },
                { questionText: 'Question 2', required: true },
                { questionText: 'Question 3', required: true }
            ]
        })
    }));
});

describe('SurveyController', () => {
    let surveyController: SurveyController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        jest.clearAllMocks();
        surveyController = new SurveyController();
        mockRequest = {
            body: {}
        };
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('create', () => {
        it('should create a new survey', async () => {
            mockRequest.body = {
                title: 'Test Survey',
                targetAudience: 'Geeks',
                questions: [
                    { questionText: 'Question 1', required: true },
                    { questionText: 'Question 2', required: true },
                    { questionText: 'Question 3', required: true }
                ]
            };

            await surveyController.create(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(Survey).toHaveBeenCalledWith(mockRequest.body);
        });

        it('should handle validation errors', async () => {
            (validateSurvey as jest.Mock).mockReturnValueOnce({
                error: { details: [{ message: 'Validation error' }] }
            });

            await surveyController.create(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Validation error'
            });
        });

        it('should handle database errors', async () => {
            const errorSurvey = jest.fn().mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Database error'))
            }));
            (Survey as unknown as jest.Mock).mockImplementation(errorSurvey);

            mockRequest.body = {
                title: 'Test Survey',
                targetAudience: 'Geeks',
                questions: [
                    { questionText: 'Question 1', required: true },
                    { questionText: 'Question 2', required: true },
                    { questionText: 'Question 3', required: true }
                ]
            };

            await surveyController.create(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Internal server error'
            });
        });
    });
});
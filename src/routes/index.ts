import { Router } from 'express';
import { SurveyController } from '../controllers/SurveyController';
import { ResponseController } from '../controllers/ResponseController';

const router = Router();
const surveyController = new SurveyController();
const responseController = new ResponseController();

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.listSurvey);
router.put('/surveys/:id', surveyController.update);
router.get('/surveys/:id', surveyController.surveyById);
router.post('/responses', responseController.create);
router.get('/responses/:targetAudience', responseController.listByTargetAudience);

export default router;
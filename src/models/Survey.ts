import mongoose, { Document, Schema } from 'mongoose';

export interface ISurvey extends Document {
    targetAudience: string;
    questions: Array<{
        questionText: string;
        required: boolean;
    }>;
    createdAt: Date;
    updatedAt?: Date;
}

const SurveySchema = new Schema({
    targetAudience: { type: String, required: true },
    questions: [{
        questionText: { type: String, required: true },
        required: { type: Boolean, default: true }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

export default mongoose.model<ISurvey>('Survey', SurveySchema);
import mongoose, { Document, Schema } from 'mongoose';

export interface IResponse extends Document {
    surveyId: Schema.Types.ObjectId;
    targetAudience: string;
    stars: number;
    email: string;
    answers: Array<{
        questionId: string;
        answer: string;
    }>;
    createdAt: Date;
}

const ResponseSchema = new Schema({
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
    targetAudience: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    email: { type: String, required: true },
    answers: [{
        questionId: { type: String, required: true },
        answer: { type: String, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IResponse>('Response', ResponseSchema);
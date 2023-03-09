import mongoose from 'mongoose';

const SurveyFBSchema = new mongoose.Schema(
    {
        idDevice: {
            type: String,
            required: true,
            trim: true
        },
        transportCode: {
            type: String,
            required: true,
            trim: true
        },
        surveyData: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

export { SurveyFBSchema };
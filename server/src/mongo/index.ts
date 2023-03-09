import mongoose from 'mongoose';
import { ServerConfig } from './../model';
import { FeedBackSchema, SurveyFBSchema } from './schema';
import * as service from './service';

mongoose.set('strictQuery', true);

const FeedBackModel = mongoose.model('FeedBack', FeedBackSchema);
const SurveyFBModel = mongoose.model('Survey', SurveyFBSchema);

const connectMongoDB = async (config: ServerConfig) => {
    await mongoose.connect(config.mongoServerUrl);
};

export { SurveyFBModel, FeedBackModel, connectMongoDB, service };
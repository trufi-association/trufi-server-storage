import { FeedBack, MongoResponseHandler, Survey } from './../../model';
import { FeedBackModel, SurveyFBModel } from './..';

const saveFeedBack = async (feedback: FeedBack, handler: MongoResponseHandler<FeedBack>): Promise<void> => {
    const feedbackModel = new FeedBackModel(feedback);

    const error = feedbackModel.validateSync();

    if (error) {
        handler.error(error);
        return;
    }

    const feed: unknown = await feedbackModel.save();

    handler.success(feed as FeedBack);
};

const saveSurvey = async (survey: Survey, handler: MongoResponseHandler<Survey>): Promise<void> => {
    const surveyModel = new SurveyFBModel(survey);

    const error = surveyModel.validateSync();

    if (error) {
        handler.error(error);
        return;
    }

    const surveyFB: unknown = await surveyModel.save();

    handler.success(surveyFB as Survey);
};

export { saveFeedBack, saveSurvey };
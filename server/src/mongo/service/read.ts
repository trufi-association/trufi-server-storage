import { FeedBack, FeedBackId, MongoResponseHandler, Survey, SurveyId } from './../../model';
import { FeedBackModel, SurveyFBModel } from './..';

const errorHandler = <Item>(handler: MongoResponseHandler<Item>) =>
    (error: Error, item: Item) => {
        if (error) {
            handler.error(error);
            return;
        }

        handler.success(item);
    };

const readFeedBacks = async (handler: MongoResponseHandler<FeedBack[]>): Promise<void> => {
    const data = await FeedBackModel.find() as FeedBack[];
    handler.success(data);
};

const readFeedBack = async (feedback: FeedBackId, handler: MongoResponseHandler<FeedBack>): Promise<void> => {
    FeedBackModel.findById(feedback.id, errorHandler(handler));
};

const readSurveys = async (handler: MongoResponseHandler<Survey[]>): Promise<void> => {
    const data = await SurveyFBModel.find() as Survey[];
    handler.success(data);
};

const readSurvey = async (survey: SurveyId, handler: MongoResponseHandler<Survey>): Promise<void> => {
    SurveyFBModel.findById(survey.id, errorHandler(handler));
};

export { readFeedBacks, readFeedBack, readSurveys, readSurvey };
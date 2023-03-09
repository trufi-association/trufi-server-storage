import { Request, Response } from 'express';
import { service } from './../mongo';
import { FeedBack, MongoResponseHandler, MongoError } from './../model';
import { MSG } from './../message';
import { toErrorResponse, toSuccessResponse } from './response';

const getFeedBacks = (req: Request, res: Response) => {
    const handler: MongoResponseHandler<FeedBack[]> = {
        success: (feedbacks: FeedBack[]) => res.send(
            toSuccessResponse(MSG.SUCCESS, feedbacks)
        ),
        error: (error: MongoError) => res.send(
            toErrorResponse(error.message)
        )
    };

    service.readFeedBacks(handler);
};

export { getFeedBacks };
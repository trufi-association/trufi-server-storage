import { Request, Response } from 'express';
import { service } from './../mongo';
import { FeedBack, FeedBackId, MongoResponseHandler, MongoError } from './../model';
import { MSG } from './../message';
import { toErrorResponse, toSuccessResponse } from './response';

const addFeedBack = (req: Request<any, any, FeedBack, any>, res: Response) => {
    const handler: MongoResponseHandler<FeedBack> = {
        success: (feedback: FeedBack) => res.send(
            toSuccessResponse(MSG.SUCCESS, feedback)
        ),
        error: (error: MongoError) => res.send(
            toErrorResponse(error.message)
        )
    };

    service.saveFeedBack(req.body, handler);
};

const getFeedBack = (req: Request<any, any, FeedBackId, any>, res: Response) => {
    if (!req.body.id) {
        res.send(toErrorResponse(MSG.NO_ID));
        return;
    }

    const handler: MongoResponseHandler<FeedBack> = {
        success: (feedback: FeedBack) => {
            if (feedback) {
                res.send(toSuccessResponse(MSG.SUCCESS, feedback));
                return;
            }
            res.send(toErrorResponse(MSG.NO_EXIST, req.body));
        },
        error: (error: MongoError) => res.send(
            toErrorResponse(error.message, req.body)
        )
    };

    service.readFeedBack(req.body, handler);
};

export { addFeedBack, getFeedBack };
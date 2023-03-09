import { Survey, MongoResponseHandler, MongoError } from './../model';
import { toErrorResponse, toSuccessResponse } from './response';
import { Request, Response } from 'express';
import { service } from './../mongo';
import { MSG } from './../message';

const getSurveys = (req: Request, res: Response) => {
    const handler: MongoResponseHandler<Survey[]> = {
        success: (survey: Survey[]) => res.send(
            toSuccessResponse(MSG.SUCCESS, survey)
        ),
        error: (error: MongoError) => res.send(
            toErrorResponse(error.message)
        )
    };

    service.readSurveys(handler);
};

export { getSurveys };
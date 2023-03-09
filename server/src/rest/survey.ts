import { Request, Response } from 'express';
import { service } from './../mongo';
import {  MongoResponseHandler, MongoError, Survey, SurveyId } from './../model';
import { MSG } from './../message';
import { toErrorResponse, toSuccessResponse } from './response';

const addSurvey = (req: Request<any, any, Survey, any>, res: Response) => {
    const handler: MongoResponseHandler<Survey> = {
        success: (survey: Survey) => res.send(
            toSuccessResponse(MSG.SUCCESS, survey)
        ),
        error: (error: MongoError) => res.send(
            toErrorResponse(error.message)
        )
    };

    service.saveSurvey(req.body, handler);
};

const getSurvey = (req: Request<any, any, SurveyId, any>, res: Response) => {
    if (!req.body.id) {
        res.send(toErrorResponse(MSG.NO_ID));
        return;
    }

    const handler: MongoResponseHandler<Survey> = {
        success: (survey: Survey) => {
            if (survey) {
                res.send(toSuccessResponse(MSG.SUCCESS, survey));
                return;
            }
            res.send(toErrorResponse(MSG.NO_EXIST, req.body));
        },
        error: (error: MongoError) => res.send(
            toErrorResponse(error.message, req.body)
        )
    };

    service.readSurvey(req.body, handler);
};

export { addSurvey, getSurvey };
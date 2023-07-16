import { ServerConfig } from './../model';
import { Express } from 'express';
import { addFeedBack, getFeedBack } from './feedback';
import { getFeedBacks } from './feedbacks';
import { addSurvey, getSurvey } from './survey';
import { getSurveys } from './surveys';

const enableServerMessage = (config: ServerConfig) => () => {
    console.log(`Server listening on http://localhost:${config.port}/apirest`);
};

const initRestServer = (app: Express, config: ServerConfig) => {
    app.post('/apirest/feedback', addFeedBack);
    app.get('/apirest/feedback', getFeedBack);
    app.get('/apirest/feedbacks', getFeedBacks);

    app.listen(config.port, enableServerMessage(config));
};

export { initRestServer };
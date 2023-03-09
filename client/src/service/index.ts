import { RequestConfig } from './../model';
import { getFeedbacks } from './feedbacks';
import { getSurveys } from './surveys';

const toRequest = async (config: RequestConfig) =>
    fetch(`${config.serverUrl}${config.endPoint}`, config.info);

export { getFeedbacks, toRequest, getSurveys };
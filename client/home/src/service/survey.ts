import { QueryResponse, RequestConfig, Survey } from './../model';

const getSurvey = async (config: RequestConfig): Promise<Survey | undefined> => {
    const response = await fetch(config.serverUrl, config.info);

    const dataJson = await response.json() as QueryResponse<Survey>;

    if (dataJson.data)
        return dataJson.data;
};

export { getSurvey };
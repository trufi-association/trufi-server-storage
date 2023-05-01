import { toRequest } from '.';
import { ENDPOINT, METHOD, QueryResponse, RequestConfig, Survey } from './../model';

const getSurveys = async (): Promise<Survey[]> => {
    const config: RequestConfig = {
        serverUrl: `${window.location.href}apirest`,
        endPoint: ENDPOINT.surveys,
        info: { method: METHOD.GET }
    };

    const response = await toRequest(config);

    const dataJson = await response.json() as QueryResponse<Survey[]>;

    if (dataJson.data)
        return dataJson.data;

    return [];
};

export { getSurveys };
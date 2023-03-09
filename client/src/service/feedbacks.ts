import { toRequest } from '.';
import { ENDPOINT, FeedBack, METHOD, QueryResponse, RequestConfig } from './../model';

const getFeedbacks = async (): Promise<FeedBack[]> => {
    const config: RequestConfig = {
        serverUrl: 'http://localhost:3000/apirest',
        endPoint: ENDPOINT.feedbacks,
        info: { method: METHOD.GET }
    };

    const response = await toRequest(config);

    const dataJson = await response.json() as QueryResponse<FeedBack[]>;

    if (dataJson.data)
        return dataJson.data;

    return [];
};

export { getFeedbacks };
import { FeedBack, QueryResponse, RequestConfig } from './../model';

const getFeedback = async (config: RequestConfig): Promise<FeedBack | undefined> => {
    const response = await fetch(config.serverUrl, config.info);

    const dataJson = await response.json() as QueryResponse<FeedBack>;

    if (dataJson.data)
        return dataJson.data;
};

export { getFeedback };
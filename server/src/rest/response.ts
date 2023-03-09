import { QueryResponse } from './../model';

const toErrorResponse = <DATA>(message: string, data?: DATA): QueryResponse<DATA> => {
    return { error: true, message, data };
};

const toSuccessResponse = <DATA>(message: string, data?: DATA): QueryResponse<DATA> => {
    return { message, data };
};

export { toErrorResponse, toSuccessResponse };
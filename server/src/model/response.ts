import { Error } from 'mongoose';

type MongoError = Error

type MongoResponseHandler<Data> = {
    success: (data: Data) => void,
    error: (error: MongoError) => void,
}

type QueryResponse<DATA> = {
    error?: boolean
    message: string
    data?: DATA
}

export { MongoResponseHandler, MongoError, QueryResponse };
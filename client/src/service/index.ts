import { RequestConfig } from './../model';
import { getFeedbacks } from './feedbacks';
import { getSurveys } from './surveys';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getRouteShape } from './route';

const uri = process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/user_tracking_graphql`
    : 'https://bo-cbba.sa.api.trufi-association.org/otp/index/graphql';

const client = new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache()
});

const toRequest = async (config: RequestConfig) =>
    fetch(`${config.serverUrl}${config.endPoint}`, config.info);

export { getFeedbacks, toRequest, getSurveys, client, getRouteShape };
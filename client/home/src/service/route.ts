import { gql } from '@apollo/client';
import { client } from '.';
import { ROUTEPOINT, RouteResponse } from './../model';

const getRouteShape = async (transportCode: string): Promise<ROUTEPOINT[]> => {
    const response = await client.query<RouteResponse>({
        fetchPolicy: 'no-cache',
        query: gql`
        query parking {
            pattern(id:"${transportCode}"){
                geometry{
                    lat
                    lon
                }
            }
        }`
    });

    if (response.data.pattern)
        return response.data.pattern.geometry;

    return [];
};

export { getRouteShape };
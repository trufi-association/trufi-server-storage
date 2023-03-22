import { ROUTEPOINT } from './segment';

type QueryResponse<DATA> = {
    error?: boolean
    message: string
    data?: DATA
}

type RouteResponse = {
    pattern: {
        geometry: ROUTEPOINT[]
    }
}

export type { QueryResponse, RouteResponse };
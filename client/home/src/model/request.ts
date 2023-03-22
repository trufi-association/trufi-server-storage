enum METHOD {
    GET = 'GET',
    POST = 'POST'
}

enum ENDPOINT {
    feedback = '/feedback',
    feedbacks = '/feedbacks',
    survey = '/survey',
    surveys = '/surveys'
}

type RInfo = {
    method: METHOD
    body?: BodyInit
}

type RequestConfig = {
    serverUrl: string
    endPoint: ENDPOINT
    info: RInfo
}

export { METHOD, ENDPOINT };

export type { RequestConfig, RInfo };
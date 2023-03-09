enum TYPEROUTE {
    FULL_ROUTE = 'FULL_ROUTE',
    PARTIAL_ROUTE = 'PARTIAL_ROUTE'
}

enum STATE {
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    CHANGED = 'CHANGED',
    OTHERS = 'OTHERS'
}

type POSITION = {
    lat: number
    lng: number
}

type SEGMENT = {
    start: POSITION
    end: POSITION
}

type FeedBack = {
    _id?: string
    idDevice: string
    idEdition: string
    transportCode: string
    typeRoute: TYPEROUTE
    state: STATE
    userLocation?: POSITION
    description?: string
    phone?: string
    segment?: SEGMENT
    segments?: SEGMENT[]
    createdAt?: string
    updatedAt?: string
}

type FeedBackId = {
    id?: string
}

export { FeedBack, FeedBackId };
import { LatLngExpression } from 'leaflet';
import { SEGMENT } from './feedback';

type ROUTEPOINT = {
    lat: number
    lon: number
}

type SegmentLine = {
    polyline: LatLngExpression[]
    options: {
        color: 'red' | 'blue'
    }
}

type SegmentIndex = {
    startIndex?: number
    endIndex?: number
    segment: SEGMENT
}

export type { SegmentLine, SegmentIndex, ROUTEPOINT };
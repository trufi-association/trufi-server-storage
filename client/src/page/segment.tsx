import { Icon } from 'leaflet';
import { Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SegmentLine } from './../model';

const iconDestination = new Icon({
    iconUrl: process.env.PUBLIC_URL + '/marker-origin.svg',
    iconSize: [32, 32]
});
const iconOrigin = new Icon({
    iconUrl: process.env.PUBLIC_URL + '/marker-destination.svg',
    iconSize: [27, 27]
});

export default function Segment({ segment }: { segment: SegmentLine }) {
    return (
        <>
            <Polyline pathOptions={segment.options} positions={segment.polyline} />
            {segment.polyline != null && segment.polyline[0] != null ? <Marker position={segment.polyline[0]} icon={iconOrigin}>
                <Popup>
                    Origin
                </Popup>
            </Marker> : null}
            {segment.polyline != null && segment.polyline[segment.polyline.length - 1] != null ? <Marker position={segment.polyline[segment.polyline.length - 1]} icon={iconDestination}>
                <Popup>
                    Destini
                </Popup>
            </Marker> : null}
        </>
    );
}

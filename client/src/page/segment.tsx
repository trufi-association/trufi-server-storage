import { Icon, LatLngExpression, PathOptions } from 'leaflet';
import { Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const iconDestination = new Icon({
    iconUrl: process.env.PUBLIC_URL + '/marker-origin.svg',
    iconSize: [32, 32]
});
const iconOrigin = new Icon({
    iconUrl: process.env.PUBLIC_URL + '/marker-destination.svg',
    iconSize: [27, 27]
});

export default function Segment({ polyline }: { polyline: LatLngExpression[] }) {
    const lineOptions = { color: 'black' };

    return (
        <>
            <Polyline pathOptions={lineOptions} positions={polyline} />
            {polyline != null && polyline[0] != null ? <Marker position={polyline[0]} icon={iconOrigin}>
                <Popup>
                    Origin
                </Popup>
            </Marker> : null}
            {polyline != null && polyline[polyline.length - 1] != null ? <Marker position={polyline[polyline.length - 1]} icon={iconDestination}>
                <Popup>
                    Destini
                </Popup>
            </Marker> : null}
        </>
    );
}

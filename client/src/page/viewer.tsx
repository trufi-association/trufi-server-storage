import { useState } from 'react';
import { latLng, LatLngBounds, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { Button, AppBar, Dialog, Fab, IconButton, Toolbar, Typography } from '@mui/material';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import 'leaflet/dist/leaflet.css';
import { FeedBack, SEGMENT } from './../model';
import Segment from './segment';

type boundsParams = {
    bounds: LatLngBoundsExpression
}

function SetBoundsRectangles({ bounds }: boundsParams) {
    const map = useMap();

    const crop = () => map.fitBounds(bounds);

    crop();
    return (
        <div
            className={'leaflet-bottom leaflet-right'}
            style={{ padding: '20px' }}>
            <div className="leaflet-control ">
                <Fab color="primary" aria-label="add" onClick={crop}>
                    <CropIcon />
                </Fab>
            </div>
        </div>
    );
}


export default function FullScreenDialog({ feedback }: { feedback: FeedBack }) {
    const position = latLng(-17.392600, -66.158787);

    const [open, setOpen] = useState(false);
    const [bounds, setBounds] = useState<LatLngBounds>(new LatLngBounds(position, position));
    const [polylines, setPolylines] = useState<LatLngExpression[][]>([]);

    const addSegment = async (segment: SEGMENT): Promise<LatLngExpression[]> => {
        return [
            latLng(segment.start.lat, segment.start.lng),
            latLng(segment.end.lat, segment.end.lng)
        ];
    };

    const getRoute = async () => {
        setOpen(true);

        const lines: LatLngExpression[][] = [];

        if (feedback.segment) {
            lines.push(await addSegment(feedback.segment));
        }

        if (!feedback.segments) {
            setPolylines(lines);
            return;
        }

        for (const s of feedback.segments) {
            lines.push(await addSegment(s));
        }

        const bounds = new LatLngBounds(lines[0][0], lines[0][0]);

        const extendsPoint = (bounds: LatLngBounds) =>
            (point: LatLngExpression) => { bounds.extend(point); };

        lines.forEach(l => {
            l.forEach(extendsPoint(bounds));
        });

        setBounds(bounds);
        setPolylines(lines);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                aria-label="outlined secondary button group"
                size="small"
                startIcon={<MapIcon />}
                variant="outlined"
                onClick={getRoute}>
                SHOW
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <AppBar >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" >
                            {feedback.idDevice}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <MapContainer
                    style={{ height: '100%', width: '100%', marginTop: '60px' }}
                    center={position}
                    zoom={14}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        url="https://bo-cbba.sa.api.trufi-association.org/static-maps/trufi-liberty/{z}/{x}/{y}@2x.jpg"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {polylines.map((line, index) =>
                        <div key={index}>
                            <Segment polyline={line} />
                        </div>
                    )}
                    <SetBoundsRectangles bounds={bounds} />
                </MapContainer>
            </Dialog>
        </>
    );
}

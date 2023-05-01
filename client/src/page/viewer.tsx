import { Button, AppBar, Dialog, Fab, IconButton, Toolbar, Typography } from '@mui/material';
import { FeedBack, POSITION, ROUTEPOINT, SegmentIndex, SegmentLine } from './../model';
import { latLng, LatLng, LatLngBounds, LatLngBoundsExpression } from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useState } from 'react';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import 'leaflet/dist/leaflet.css';
import { getRouteShape } from './../service';
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


export default function FullScreenDialog({ feedback, setInProgress }: { feedback: FeedBack, setInProgress: React.Dispatch<React.SetStateAction<boolean>> }) {
    const position = latLng(-17.392600, -66.158787);

    const [open, setOpen] = useState(false);
    const [bounds, setBounds] = useState<LatLngBounds>(new LatLngBounds(position, position));
    const [polylines, setPolylines] = useState<SegmentLine[]>([]);

    const comparePoints = (a: POSITION, b: ROUTEPOINT): boolean => {
        return a.lat === b.lat && a.lng === b.lon;
    };

    const compareSegment = (is: SegmentIndex, pos: ROUTEPOINT, index: number) => {
        if (comparePoints(is.segment.start, pos))
            is.startIndex = index;

        if (comparePoints(is.segment.end, pos))
            is.endIndex = index;
    };


    const toSegment = (is: SegmentIndex, routeLine: LatLng[], lines: SegmentLine[]) => {
        if (!is.startIndex) return [];
        if (!is.endIndex) return [];

        lines.push({
            polyline: routeLine.slice(is.startIndex, is.endIndex),
            options: { color: 'blue' }
        });
    };

    const convertToLines = (routePoints: ROUTEPOINT[], feedback: FeedBack): SegmentLine[] => {
        const bounds = new LatLngBounds(position, position);
        const lines: SegmentLine[] = [];
        let indexSegment: SegmentIndex | null = null;
        let indexSegments: SegmentIndex[] | null = null;

        if (feedback.segment)
            indexSegment = { segment: feedback.segment };

        if (feedback.segments)
            indexSegments = feedback.segments.map(segment => { return { segment }; });

        const routeLine = routePoints.map((position, index) => {
            if (indexSegment) compareSegment(indexSegment, position, index);

            if (indexSegments) indexSegments.forEach(is => compareSegment(is, position, index));

            const latLngPosition = latLng(position.lat, position.lon);

            bounds.extend(latLngPosition);

            return latLngPosition;
        });

        lines.push({ polyline: routeLine, options: { color: 'red' } });

        if (indexSegment) {
            toSegment(indexSegment, routeLine, lines);
        }

        if (indexSegments) {
            indexSegments.forEach(is => {
                toSegment(is, routeLine, lines);
            });
        }

        setBounds(bounds);

        return lines;
    };

    const getRoute = async () => {
        setInProgress(true);

        const routePoints = await getRouteShape(feedback.transportCode);

        if (routePoints.length === 0) {
            setInProgress(false);
            return;
        }

        const lines = convertToLines(routePoints, feedback);


        setPolylines(lines);

        setInProgress(false);

        setOpen(true);
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
                            <Segment segment={line} />
                        </div>
                    )}
                    <SetBoundsRectangles bounds={bounds} />
                </MapContainer>
            </Dialog>
        </>
    );
}

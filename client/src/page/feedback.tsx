import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { FeedBack } from './../model';
import { DownloadFeedback } from './downloadfeedback';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/en-au';

export function FeedBackItem({ feedback }: { feedback: FeedBack }) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        id: {feedback._id}<br />
                        idDevice: {feedback.idDevice}<br />
                        idEdition: {feedback.idEdition} <br />
                        transportCode: {feedback.transportCode}<br />
                        typeRoute: {feedback.typeRoute}<br />
                        state: {feedback.state}<br />
                        userLocation: {JSON.stringify(feedback?.userLocation)}<br />
                        description: {feedback?.description}<br />
                        phone: {feedback?.phone}<br />
                    </>
                }
                secondary={
                    <>
                        created: <Moment>{feedback.createdAt}</Moment><br />
                        updated: <Moment>{feedback.updatedAt}</Moment>
                    </>
                }
            />
            <DownloadFeedback feedback={feedback} />
        </ListItem>
    );
}
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Survey } from './../model';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/en-au';
import { DownloadSurvey } from './downloadsurvey';

export function SurveyItem({ survey }: { survey: Survey }) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        id: {survey._id}<br />
                        idDevice: {survey.idDevice}<br />
                        transportCode: {survey.transportCode}<br />
                    </>
                }
                secondary={
                    <>
                        created: <Moment>{survey.createdAt}</Moment><br />
                        updated: <Moment>{survey.updatedAt}</Moment>
                    </>
                }
            />
            <DownloadSurvey survey={survey} />
        </ListItem>
    );
}
import { Divider, Grid, List } from '@mui/material';
import React from 'react';
import { Survey } from './../model';
import { store } from './..';
import { SurveyItem } from './survey';

export default function SurveyList() {
    const [surveys, setPeding] = React.useState<Survey[]>([]);

    React.useEffect(() => {
        const subscription = store.surveys.subscribe((items: Survey[]) => {
            setPeding(items);
        });
        return () => subscription?.unsubscribe();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <List>
                    {
                        surveys.map((survey, id) =>
                            <div key={id}>
                                <SurveyItem survey={survey} />
                                <Divider variant="inset" component="li" />
                            </div>
                        )
                    }
                </List>
            </Grid>
        </Grid>
    );
}
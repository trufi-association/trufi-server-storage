import { Divider, Grid, List } from '@mui/material';
import React from 'react';
import { FeedBack } from './../model';
import { store } from './..';
import { FeedBackItem } from './feedback';

export default function FeedBackList() {
    const [feedbacks, setPeding] = React.useState<FeedBack[]>([]);

    React.useEffect(() => {
        const subscription = store.feedbacks.subscribe((items: FeedBack[]) => {
            setPeding(items);
        });
        return () => subscription?.unsubscribe();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <List>
                    {
                        feedbacks.map((feedback, id) =>
                            <div key={id}>
                                <FeedBackItem feedback={feedback} />
                                <Divider variant="inset" component="li" />
                            </div>
                        )
                    }
                </List>
            </Grid>
        </Grid>
    );
}
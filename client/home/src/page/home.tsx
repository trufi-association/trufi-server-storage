import React, { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FeedBackList from './feedbacklist';
import { AuthContext } from './../state';
import { AppBar, Button, Toolbar, Typography, CircularProgress } from '@mui/material';
import SurveyList from './surveylist';
import { store } from './..';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const downloadFile = (id: string, data: string, extension: string) => {
    const element = document.createElement('a');
    const file = new Blob([data], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${id}.${extension}`;
    document.body.appendChild(element);
    element.click();
};

export default function BasicTabs() {
    const { logout } = useContext(AuthContext);
    const [value, setValue] = React.useState(0);
    const [updating, setUpdating] = React.useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const updateLists = async () => {
        setUpdating(true);
        await store.update();
        setUpdating(false);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Storage
                    </Typography>
                    {updating ? <CircularProgress color='inherit' size={20} /> : <Button color="inherit" onClick={updateLists}>update</Button>}
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Route" {...a11yProps(0)} />
                    <Tab label="Survey" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <FeedBackList />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SurveyList />
            </TabPanel>
        </Box>
    );
}
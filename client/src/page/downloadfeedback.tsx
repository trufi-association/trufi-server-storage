import { FeedBack } from './../model';
import { Button, ButtonGroup, LinearProgress } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FullScreenDialog from './viewer';
import { downloadFile } from './home';
import { useState } from 'react';

export function DownloadFeedback({ feedback }: { feedback: FeedBack }) {
    const [inProgress, setInProgress] = useState(false);

    const downloadJsonFile = () => {
        downloadFile(feedback._id, JSON.stringify(feedback), 'json');
    };

    return (
        <div >
            <ButtonGroup size="small" color="primary" aria-label="small outlined primary button group">
                <Button
                    aria-label="outlined secondary button group"
                    size="small"
                    startIcon={<FileDownloadIcon />}
                    onClick={downloadJsonFile}
                >
                    DOWNLOAD
                </Button>
                <FullScreenDialog feedback={feedback} setInProgress={setInProgress} />
            </ButtonGroup>
            {inProgress ? <LinearProgress /> : null}
        </div>
    );
}

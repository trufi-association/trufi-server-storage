import { FeedBack } from './../model';
import { Button, ButtonGroup } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FullScreenDialog from './viewer';
import { downloadFile } from './home';

export function DownloadFeedback({ feedback }: { feedback: FeedBack }) {
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
                <FullScreenDialog feedback={feedback} />
            </ButtonGroup>
        </div>
    );
}

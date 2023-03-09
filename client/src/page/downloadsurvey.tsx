import { Survey } from './../model';
import { Button, ButtonGroup } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { downloadFile } from './home';

export function DownloadSurvey({ survey }: { survey: Survey }) {
    const downloadJsonFile = () => {
        downloadFile(survey._id, JSON.stringify(survey), 'json');
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
            </ButtonGroup>
        </div>
    );
}

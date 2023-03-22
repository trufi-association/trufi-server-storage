import * as express from 'express';
import * as cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./home/build'));

const config: ServerConfig = {
    port: process.env.SERVER_PORT || 3000,
    mongoServerUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/'
};

const enableServerMessage = () => {
    console.log(`Server listening on http://localhost:${config.port}/apirest`);
};

app.listen(3000, enableServerMessage);
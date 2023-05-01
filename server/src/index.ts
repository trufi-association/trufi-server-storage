import * as express from 'express';
import * as cors from 'cors';
import { config } from './configuration';
import { ServerConfig } from './model';
import { connectMongoDB } from './mongo';
import { initRestServer } from './rest';

const app = express();

app.use(cors());
app.use(express.json());

const initServer = async (config: ServerConfig) => {
    await connectMongoDB(config);
    await initRestServer(app, config);
};

initServer(config);
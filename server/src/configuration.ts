import { ServerConfig } from './model';

const config: ServerConfig = {
    port: process.env.SERVER_PORT || 3000,
    mongoServerUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/'
};

export { config };
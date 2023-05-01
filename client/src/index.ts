import * as express from 'express';
import * as cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./home/build'));

const enableServerMessage = () => {
    console.log(`Server listening on http://localhost:3000/apirest`);
};

app.listen(3000, enableServerMessage);
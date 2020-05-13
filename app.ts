import Express from 'express';
import Router from './routes';
import bodyParser from 'body-parser';
import {mongoinit} from './utils';
import cors from 'cors';

const app = Express();

mongoinit();

app.set('trustproxy', 1);
app.use(cors({
	credentials: true, // enable set cookie
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	origin: ['https://localhost']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(Router);

app.listen(3000, () => {
  console.log("server on");
});

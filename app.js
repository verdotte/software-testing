import express from 'express';
import bodyParser from 'body-parser';
import Database from './src/models/Db';
import router from './src/routes/index';

const app = express();

Database.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.use('/api/v1', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

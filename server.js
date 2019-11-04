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


app.use('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Bad request' });
});

export default app;

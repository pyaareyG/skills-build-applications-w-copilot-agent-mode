import express from 'express';
import cors from 'cors';
import './config/database';
import { apiBaseUrl } from './config/apiBaseUrl';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`Octofit Tracker API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});

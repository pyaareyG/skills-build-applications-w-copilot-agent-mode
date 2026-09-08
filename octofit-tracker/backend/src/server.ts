import express from 'express';
import './config/database';
import { apiBaseUrl, port } from './config/apiBaseUrl';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
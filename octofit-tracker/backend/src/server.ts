import express from 'express';
import './config/database.js';
import { baseUrl, port } from './config/environment.js';
import usersRouter from './routes/users.js';
import activitiesRouter from './routes/activities.js';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api', (_request, response) => {
  response.json({
    baseUrl,
    endpoints: {
      users: `${baseUrl}/api/users/`,
      activities: `${baseUrl}/api/activities/`
    }
  });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on ${baseUrl} (port ${port})`);
});
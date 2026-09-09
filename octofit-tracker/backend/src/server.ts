import express from 'express';
import usersRouter from './routes/users';
// @ts-ignore - module will be created at './routes/teams.ts'
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
// @ts-ignore - module will be created at './routes/leaderboard.ts'
import leaderboardRouter from './routes/leaderboard';
// @ts-ignore - module will be created at './routes/workouts.ts'
import workoutsRouter from './routes/workouts';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const codespacesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : null;
const apiBaseUrl = codespacesApiUrl || `http://localhost:${port}`;

app.use(express.json());

// Configure CORS to allow frontend dev server and Codespaces URL when present
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
if (codespacesApiUrl) {
  allowedOrigins.push(codespacesApiUrl);
}

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Allow requests with no origin (like curl or server-to-server requests).
  if (origin && !allowedOrigins.includes(origin)) {
    return next(new Error('CORS policy: Origin not allowed'));
  }

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    port,
    apiBaseUrl,
    codespaceName: codespaceName || null
  });
});

// Note: server is not started here. Call `app.listen(port)` after a successful
// database connection to ensure the app is ready to serve requests.

export default app;
export { apiBaseUrl, codespaceName, codespacesApiUrl, port };
import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const findMock = vi.fn();

vi.mock('../models/Activity', () => ({
  default: { find: () => ({ lean: findMock }) }
}));

const activitiesRouter = (await import('./activities')).default;

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/activities', activitiesRouter);
  return app;
}

describe('GET /api/activities', () => {
  beforeEach(() => {
    findMock.mockReset();
  });

  it('returns the activities from the data tier', async () => {
    findMock.mockResolvedValue([
      { _id: '1', user: 'ada@example.com', type: 'Run', durationMinutes: 30 }
    ]);

    const response = await request(buildApp()).get('/api/activities');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({ type: 'Run', durationMinutes: 30 });
  });

  it('returns an empty array when there are no activities', async () => {
    findMock.mockResolvedValue([]);

    const response = await request(buildApp()).get('/api/activities');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

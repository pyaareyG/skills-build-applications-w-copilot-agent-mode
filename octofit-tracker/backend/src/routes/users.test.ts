import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const findMock = vi.fn();

vi.mock('../models/User', () => ({
  default: { find: () => ({ lean: findMock }) }
}));

const usersRouter = (await import('./users')).default;

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/users', usersRouter);
  return app;
}

describe('GET /api/users', () => {
  beforeEach(() => {
    findMock.mockReset();
  });

  it('returns the users from the data tier', async () => {
    findMock.mockResolvedValue([
      { _id: '1', name: 'Ada Lovelace', email: 'ada@example.com', team: 'Blue' }
    ]);

    const response = await request(buildApp()).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { _id: '1', name: 'Ada Lovelace', email: 'ada@example.com', team: 'Blue' }
    ]);
  });

  it('returns an empty array when there are no users', async () => {
    findMock.mockResolvedValue([]);

    const response = await request(buildApp()).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

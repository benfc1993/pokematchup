import express from 'express';
import { readFile } from 'fs/promises';
import cors from 'cors';
import teamRouter from './routes/team';
import matchupsRouter from './routes/matchups';

type Cache = {
  index: string[];
  data: number[][];
};

export let cache: Cache;
export const app = express();
app.use(cors());
app.use(express.json());

app.use('/team', teamRouter);
app.use('/matchup', matchupsRouter);

app.listen(3000, async () => {
  cache = JSON.parse((await readFile('data/cache.json')).toString());
  console.log('Server listening on port 3000');
});

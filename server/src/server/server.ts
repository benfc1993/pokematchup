import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
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
app.use(express.static(path.resolve(__dirname, '../../../app/build')));

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.write('LIVE');
  res.end();
});

app.use('/team', teamRouter);
app.use('/matchup', matchupsRouter);
app.use(express.static(path.resolve(__dirname, '../../../app/public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../app/build/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  cache = JSON.parse((await readFile('data/cache.json')).toString());
  console.log(`Server listening on port ${PORT}`);
});

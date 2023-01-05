import express from 'express';
import { byName } from './byName';
import { byType } from './byType';

const matchupsRouter = express.Router();

byName(matchupsRouter);
byType(matchupsRouter);

export default matchupsRouter;

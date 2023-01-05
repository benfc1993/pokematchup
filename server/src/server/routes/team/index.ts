import express from 'express';
import { addMember } from './addMember';
import { setTeam } from './setTeam';

const teamRouter = express.Router();

addMember(teamRouter);
setTeam(teamRouter);

export default teamRouter;

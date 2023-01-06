import express from 'express';
import { addMemberByName } from './addMemberByName';
import { addMemberByTypes } from './addMemberByTypes';
import { setTeam } from './setTeam';

const teamRouter = express.Router();

addMemberByName(teamRouter);
addMemberByTypes(teamRouter);
setTeam(teamRouter);

export default teamRouter;

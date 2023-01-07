import express from 'express';
import { addMemberByName } from './addMemberByName';
import { addMemberByTypes } from './addMemberByTypes';
import { removeMemberById } from './removeMember';
import { setTeam } from './setTeam';

const teamRouter = express.Router();

addMemberByName(teamRouter);
addMemberByTypes(teamRouter);
setTeam(teamRouter);
removeMemberById(teamRouter);

export default teamRouter;

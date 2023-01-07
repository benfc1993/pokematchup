import { Router } from 'express';
import { typesToNames } from '../../../services/conversions';
import { TeamData, validateTeam } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const removeMemberById = (router: Router) =>
  router.post(
    '/remove',
    async (
      req: ApiRequest<{
        teamData: TeamData;
        memberIndex: number;
      }>,
      res
    ) => {
      const { teamData, memberIndex } = req.body;

      if (isNaN(memberIndex)) return res.sendStatus(400);
      if (req.body instanceof Array)
        return res.status(400).send('Request data malformed');

      const currentTeam = teamData;
      const types = currentTeam.types.filter(
        (_types, idx) => idx !== memberIndex
      );

      const names = Object.values(currentTeam.team)
        .map((member) => member?.monName ?? '')
        .filter((_n, idx) => idx !== memberIndex);

      try {
        const newTeam = validateTeam(types, names);

        res.status(201).json(newTeam);
      } catch (err: any) {
        res.sendStatus(err.response.status as number);
      }
    }
  );

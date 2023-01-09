import { Router } from 'express';
import { namesToTypes, typesToNames } from '../../../services/conversions';
import { TeamData, validateTeam } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const removeMemberById = (router: Router) =>
  router.post(
    '/remove',
    async (
      req: ApiRequest<{
        teamData: TeamData;
        memberId: string;
      }>,
      res
    ) => {
      const { teamData, memberId } = req.body;

      if (!memberId) return res.sendStatus(400);
      if (req.body instanceof Array)
        return res.status(400).send('Request data malformed');

      const currentTeam = teamData.team.filter(
        (member) => member.id !== memberId
      );
      const types = currentTeam.reduce((acc: number[][], member) => {
        acc.push(namesToTypes(member.types));
        return acc;
      }, []);

      const names = currentTeam.reduce((acc: string[], member) => {
        acc.push(member.monName);
        return acc;
      }, []);

      try {
        const newTeam = validateTeam(types, names);

        res.status(201).json(newTeam);
      } catch (err: any) {
        res.sendStatus(err.response.status as number);
      }
    }
  );

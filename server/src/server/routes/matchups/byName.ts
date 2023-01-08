import { Router } from 'express';
import { matchupByName } from '../../../services/getPokemon';
import { TeamData } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const byName = (router: Router) =>
  router.post(
    '/name',
    async (
      req: ApiRequest<{
        teamData: TeamData;
        name: string;
      }>,
      res
    ) => {
      const { teamData, name } = req.body;

      const newTeam = await matchupByName(teamData, name);

      res.status(201).json(newTeam);
    }
  );

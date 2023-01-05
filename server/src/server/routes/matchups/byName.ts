import { Router } from 'express';
import { matchupByName } from '../../../services/getPokemon';
import { TeamData } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const byName = (router: Router) =>
  router.post(
    '/name',
    async (
      req: ApiRequest<{
        team: TeamData;
        name: string;
      }>,
      res
    ) => {
      const { team, name } = req.body;

      const newTeam = await matchupByName(team, name);

      res.status(201).json(newTeam);
    }
  );

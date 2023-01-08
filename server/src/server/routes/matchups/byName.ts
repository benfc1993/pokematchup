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

      await matchupByName(teamData, name)
        .then((newTeam) => res.status(201).json(newTeam))
        .catch((error) => res.status(404).send('Pokemon not found'));
    }
  );

import { Router } from 'express';
import { namesToTypes } from '../../../services/conversions';
import { matchupByTypes } from '../../../services/getPokemon';
import { Types } from '../../../services/perms';
import { TeamData } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const byType = (router: Router) =>
  router.post(
    '/type',
    async (
      req: ApiRequest<{
        teamData: TeamData;
        types: string[];
      }>,
      res
    ) => {
      const { teamData, types } = req.body;

      await matchupByTypes(teamData, namesToTypes(types))
        .then((newTeam) => res.status(201).json(newTeam))
        .catch((error) => res.status(404).send('Pokemon not found'));
    }
  );

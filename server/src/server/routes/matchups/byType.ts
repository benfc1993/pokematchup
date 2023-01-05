import { Router } from 'express';
import { matchupByTypes } from '../../../services/getPokemon';
import { Types } from '../../../services/perms';
import { TeamData } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const byType = (router: Router) =>
  router.post(
    '/type',
    async (
      req: ApiRequest<{
        team: TeamData;
        opponentTypes: Types[];
      }>, 
      res
    ) => {
      const { team, opponentTypes } = req.body;

      const newTeam = await matchupByTypes(team, opponentTypes);

      res.status(201).json(newTeam);
    }
  );

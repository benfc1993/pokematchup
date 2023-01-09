import { Router } from 'express';
import { namesToTypes } from '../../../services/conversions';
import { TeamData, validateTeam } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const addMemberByTypes = (router: Router) =>
  router.post(
    '/add/types',
    async (
      req: ApiRequest<{
        teamData: TeamData;
        types: string[];
      }>,
      res
    ) => {
      const { teamData, types } = req.body;

      if (!req.body.types || !req.body.teamData)
        return res.status(400).send('Request data malformed');

      if (req.body instanceof Array)
        return res.status(400).send('Request data malformed');

      const currentTeam = teamData;
      const names = Object.values(currentTeam.team).map(
        (member) => member?.monName ?? ''
      );

      currentTeam.types.push(namesToTypes(types));
      names.push('');

      const newTeam = validateTeam(currentTeam.types, names);

      res.status(201).json(newTeam);
    }
  );

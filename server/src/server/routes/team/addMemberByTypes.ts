import { Router } from 'express';
import { TeamData, validateTeam } from '../../../services/teamValidations';
import { sentenceCase } from '../../../services/utils';
import { ApiRequest } from '../../types';

export const addMemberByTypes = (router: Router) =>
  router.post(
    '/add/types',
    async (
      req: ApiRequest<{
        teamData: TeamData;
        types: number[];
        name: string;
      }>,
      res
    ) => {
      const { teamData, name, types } = req.body;

      if (!req.body.name || !req.body.types || !req.body.teamData)
        return res.status(400).send('Request data malformed');

      if (req.body instanceof Array)
        return res.status(400).send('Request data malformed');

      const currentTeam = teamData;
      const names = Object.values(currentTeam.team).map(
        (member) => member?.monName ?? ''
      );

      currentTeam.types.push(types);
      names.push(sentenceCase(name));

      const newTeam = validateTeam(currentTeam.types, names);

      res.status(201).json(newTeam);
    }
  );

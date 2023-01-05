import { Router } from 'express';
import { validateTeam } from '../../../services/teamValidations';
import { ApiRequest } from '../../types';

export const addMember = (router: Router) =>
  router.post(
    '/add',
    async (
      req: ApiRequest<{
        team: { types: number[][]; names: string[] };
        types: number[];
        name: string;
      }>,
      res
    ) => {
      const { team, name, types } = req.body;
      if (req.body instanceof Array)
        return res.status(400).send('Request data malformed');

      const currentTeam = team;

      currentTeam.types.push(types);
      currentTeam.names.push(name);

      const newTeam = validateTeam(currentTeam.types, currentTeam.names);

      res.status(201).json(newTeam);
    }
  );

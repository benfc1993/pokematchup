import { Router } from 'express';
import { getPokemonTypes } from '../../../services/getPokemon';
import { TeamData, validateTeam } from '../../../services/teamValidations';
import { sentenceCase } from '../../../services/utils';
import { ApiRequest } from '../../types';

export const addMemberByName = (router: Router) =>
  router.post(
    '/add/name',
    async (
      req: ApiRequest<{
        teamData: TeamData;
        name: string;
      }>,
      res
    ) => {
      const { teamData, name } = req.body;

      if (!name || name === '') return res.sendStatus(400);
      if (req.body instanceof Array)
        return res.status(400).send('Request data malformed');

      const currentTeam = teamData;

      const names = Object.values(currentTeam.team).map(
        (member) => member?.monName ?? ''
      );

      try {
        const cleanName = name.replace(/\'/, '');
        const types = await getPokemonTypes(cleanName);
        currentTeam.types.push(types);
        names.push(sentenceCase(name));

        const newTeam = validateTeam(currentTeam.types, names);

        res.status(201).json(newTeam);
      } catch (err: any) {
        res.sendStatus(err.response.status as number);
      }
    }
  );

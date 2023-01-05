import { writeFile } from 'fs/promises';
import { ApiRequest } from '../../types';
import { Router } from 'express';
import { validateTeam } from '../../../services/teamValidations';

export const setTeam = (router: Router) =>
  router.post(
    '/set',
    async (req: ApiRequest<{ types: number[]; name: string }[]>, res) => {
      const validRequestBody = validateRequestBody(req.body);

      if (!validRequestBody) return res.sendStatus(400);

      const data = req.body.reduce(
        (arr: [number[][], string[]], member) => {
          arr[0].push(member.types);
          arr[1].push(member.name);
          return arr;
        },
        [[], []]
      );

      const team = validateTeam(data[0], data[1]);
      await writeFile('data/team.json', JSON.stringify(team));
      res.status(201).json(team);
    }
  );
function validateRequestBody(body: { types: number[]; name: string }[]) {
  if (!(body instanceof Array)) return false;

  for (const item of body) {
    if (!('types' in item) || !('name' in item)) return false;
  }
  return true;
}

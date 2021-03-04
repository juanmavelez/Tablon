import * as express from 'express';
import { environment } from '@environments/environment';
import axios from 'axios';
import { badImplementation } from '@hapi/boom';

function coursesApi(server: express.Express): void {
  const router = express.Router();
  server.use('/courses', router);

  router.get(
    '/',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const { data, status } = await axios({
          url: `${environment.API_URL}/courses`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'get',
        });
        if (status !== 200) {
          return next(badImplementation());
        }
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );
  router.get(
    '/user/:userId',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const { data, status } = await axios({
          url: `${environment.API_URL}/user-courses`,
          headers: { Authorization: `Barer ${token}` },
          method: 'get',
        });
        if (status !== 200) {
          return next(badImplementation());
        }
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );
}

export default coursesApi;

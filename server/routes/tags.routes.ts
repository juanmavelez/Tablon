import * as express from 'express';
import { environment } from '@environments/environment';
import axios from 'axios';
import { badImplementation } from '@hapi/boom';

export default function tagsApi(server: express.Express): void {
  const router = express.Router();
  server.use('/tags-proxy', router);

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
          url: `${environment.API_URL}/tags`,
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
}

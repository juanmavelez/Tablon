import * as express from 'express';
import * as passport from 'passport';
import { unauthorized } from '@hapi/boom';
import { IAuthRequest } from '../models/AuthRequest.model';
import { environment } from '@environments/environment';
import axios from 'axios';

import '../utils/strategies/basic';

const THIRTY_DAYS_IN_SEC = 2592000;
const TWO_HOURS_IN_SEC = 7200;

function authApi(server: express.Express): void {
  const router = express.Router();
  server.use('/auth-proxy', router);

  // SIGN-IN
  router.post(
    '/sign-in',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { remenberMe } = req.body;
      passport.authenticate('basic', (err: Error, data: IAuthRequest) => {
        try {
          if (err || !data) {
            next(unauthorized('Invalid input, please try again'));
          } else {
            req.login(data, { session: false }, async () => {
              if (err) {
                next(err);
              }
              const { token, ...user } = data;
              res.cookie('token', token, {
                httpOnly: environment.production,
                secure: environment.production,
                maxAge: 2592000,
              });
              res.status(200).json(user);
            });
          }
        } catch (err) {
          next(err);
        }
      })(req, res, next);
    }
  );

  // REGISTER
  router.post(
    '/register',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { body: user } = req;
      try {
        await axios({
          url: `${environment.API_URL}/auth/sign-up`,
          method: 'post',
          data: user,
        });
        res.status(201).json({ message: 'user created' });
      } catch (err) {
        next(err);
      }
    }
  );
}

export default authApi;

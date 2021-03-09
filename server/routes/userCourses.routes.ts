import * as express from 'express';
import axios from 'axios';
import { environment } from '@environments/environment';
import { badImplementation } from '@hapi/boom';

function userCoursesApi(server: express.Express): void {
  const router = express.Router();
  server.use('/user-courses', router);

  router.get(
    '/user/:user_id',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const id = req.params;
        const { data, status } = await axios({
          url: `${environment.API_URL}/user-courses`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'get',
          params: id,
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
    '/:user_id',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const id = req.params;
        const { data, status } = await axios({
          url: `${environment.API_URL}/user-courses/${id.userCoursesId}`,
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

  router.post(
    '/',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { body: userCourses } = req;
        const { token } = req.cookies;
        const { data, status } = await axios({
          url: `${environment.API_URL}/user-courses`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'post',
          data: userCourses,
        });
        if (status !== 201) {
          return next(badImplementation());
        }
        res.status(201).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userCoursesId',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { userCoursesId } = req.params;
        const { token } = req.cookies;
        const { data, status } = await axios({
          url: `${environment.API_URL}/user-courses/${userCoursesId}`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'delete',
          data: userCoursesId,
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

export default userCoursesApi;

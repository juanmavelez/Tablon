import * as express from 'express';
import axios from 'axios';
import { environment } from '@environments/environment';
import { badImplementation } from '@hapi/boom';

function userCoursesApi(server: express.Express): void {
  const router = express.Router();
  server.use('/user-courses-proxy', router);

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
          url: `${environment.API_URL}/user-courses/${id.user_id}`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'get',
          data: id,
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
    '/courses/:courses_id',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const id = req.params;
        const { data, status } = await axios({
          url: `${environment.API_URL}/user-courses/${id.course_id}`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'get',
          data: id,
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
    '/',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const id = req.query;
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

  router.post(
    '/:userId',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { body: userCourse } = req;
        const { token } = req.cookies;
        const { data, status } = await axios({
          url: `${environment.API_URL}/user-courses`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'post',
          data: userCourse,
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

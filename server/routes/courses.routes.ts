import * as express from 'express';
import { environment } from '@environments/environment';
import axios from 'axios';
import { badImplementation } from '@hapi/boom';

function coursesApi(server: express.Express): void {
  const router = express.Router();
  server.use('/courses-proxy', router);

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
    '/:courseId',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const id = req.params;
        const { data, status } = await axios({
          url: `${environment.API_URL}/courses/${id.courseId}`,
          headers: { Authorization: `Bearer ${token}` },
          params: id,
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
        const { token } = req.cookies;
        const { body: course } = req;
        const { data, status } = await axios({
          url: `${environment.API_URL}/courses`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'post',
          data: course,
        });
        if (status !== 201) {
          return next(badImplementation());
        }
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:course_id',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { token } = req.cookies;
        const { body: course } = req;
        const id = req.params;
        const { data, status } = await axios({
          url: `${environment.API_URL}/courses/${id.course_id}`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'put',
          data: course,
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

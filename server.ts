import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { environment } from './src/environments/environment';

import { badImplementation } from '@hapi/boom';
import authApi from './server/routes/auth.routes';
import * as cookieParser from 'cookie-parser';
import axios from 'axios';

import './server/utils/strategies/basic';
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/Tablon/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser

  server.use(express.json());
  server.use(cookieParser());
  authApi(server);
  server.post(
    '/user-courses',
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
  server.delete(
    '/user-courses/:userCoursesId',
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
  server.get(
    '/courses',
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
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  return server;
}

function run(): void {
  const port = environment.PORT || 4000;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

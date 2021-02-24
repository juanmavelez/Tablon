server.post(
  '/auth/sign-in',
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('basic', (err: Error, data: object) => {
      try {
        if (err || !data) {
          next(unauthorized());
        }
        req.login(data, { session: false }, async (err: Error) => {
          if (err) {
            next(err);
          }
          res.cookie('token', token, {
            httpOnly: environment.production,
            secure: environment.production,
          });
          res.status(200).json(user);
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  }
);

server.post(
  '/auth/sign-up',
  async (req: Request, res: Response, next: NextFunction) => {
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

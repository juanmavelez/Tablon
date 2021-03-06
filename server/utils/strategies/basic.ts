import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { unauthorized } from '@hapi/boom';
import { environment } from '@environments/environment';
import axios from 'axios';

passport.use(
  new BasicStrategy(async (email: string, password: string, callback) => {
    try {
      const { data, status } = await axios({
        url: `${environment.API_URL}/auth/sign-in`,
        method: `post`,
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: environment.API_KEY_TOKEN,
        },
      });
      if (!data || status !== 200) {
        return callback(unauthorized('Fail to log in'), false);
      }
      return callback(null, data);
    } catch (err) {
      callback(unauthorized(err));
    }
  })
);

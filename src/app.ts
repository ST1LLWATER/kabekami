import express, {json} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import createSessionFileStore from 'session-file-store';
import * as middlewares from './middlewares';

import routers from './routes';

const app = express();
const MemoryStore = createMemoryStore(session);
const SessionFileStore = createSessionFileStore(session);

// CORS only in development because the app will be hosted on the same domain in prod.
if (process.env.NODE_ENV === 'development')
  app.use(
    cors({
      origin: [process.env.APP_URL || 'localhost:3000'],
      credentials: true,
    })
  );

app.use(morgan('dev'));
app.use(json());
app.use(
  session({
    cookie: {
      maxAge: parseInt(
        process.env.SESSION_COOKIE_MAX_AGE || (84000 * 1000).toString()
      ),
      sameSite: 'lax',
      secure: 'auto',
    },
    store:
      // using file store for development because memory store gets cleared every time app restarts
      process.env.NODE_ENV === 'development'
        ? new SessionFileStore({
            path: '.session',
          })
        : new MemoryStore({
            checkPeriod: parseInt(
              process.env.SESSION_COOKIE_MAX_AGE || (84000 * 1000).toString()
            ),
          }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || process.env.SECRET || 'kabekami',
  })
);

routers.forEach(({router, path}) => {
  if (path) {
    app.use(path, router);
  } else app.use(router);
});

app.use(middlewares.errorHandler);

export default app;

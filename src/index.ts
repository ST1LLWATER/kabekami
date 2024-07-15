// eslint-disable-next-line node/global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== 'production')
  import('dotenv').then(({config}) => config());

// eslint-disable-next-line import/first
import app from './app';
import logger from './utils/logger';

const {PORT = 5000} = process.env;

const server = app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);

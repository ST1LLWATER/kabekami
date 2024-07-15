import type {Router as ExpressRouter} from 'express';

import wallpapers from './wallpapers';

export interface Router {
  router: ExpressRouter;
  path?: string;
}

const routers: Router[] = [
  {
    router: wallpapers,
    path: '/api/wallpapers',
  },
];

export default routers;

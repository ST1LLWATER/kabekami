import * as controller from '@/controllers';
import {Router} from 'express';

const router = Router();

router.get('/all', controller.getWallpapers);

export default router;

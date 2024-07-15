import * as controller from '../controllers/wallpapers.controller';
import {Router} from 'express';

const router = Router();

router.get('/all', controller.getWallpapers);

export default router;

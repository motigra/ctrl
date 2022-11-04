import { Router } from 'express';
import { getManifest, runApp } from './controller';
 
const router: Router = Router();

router.get('/launch/manifest', getManifest);
router.post('/launch/:name', runApp);
router.get('/launch/:name', runApp);

export default router;

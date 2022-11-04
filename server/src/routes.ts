import { Router } from 'express';
import { getVolumes, launchCalc, setVolumeByName } from './controllers';
import abilitiesRouter from './abilities/routes';
 
const router: Router = Router();

router.get('/volumes', getVolumes);
router.post('/volumes/:name', setVolumeByName);
router.post('/cmd/calc', launchCalc);

router.use(abilitiesRouter);

export default router;

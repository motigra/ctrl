import { Router } from 'express';
import { getVolumes, launchCalc, setVolumeByName } from './controllers';
 
const router: Router = Router();

router.get('/volumes', getVolumes);
router.post('/volumes/:name', setVolumeByName);
router.post('/cmd/calc', launchCalc);

export default router;

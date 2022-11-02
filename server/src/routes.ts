import { Router } from 'express';
import { getVolumes, launchCalc } from './controllers';
 
const router: Router = Router();

router.get('/volumes', getVolumes);
router.post('/cmd/calc', launchCalc);

export default router;
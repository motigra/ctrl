import { Router } from 'express';
import { getVolumes } from './controllers';
 
const router: Router = Router();

router.get('/volumes', getVolumes);

export default router;
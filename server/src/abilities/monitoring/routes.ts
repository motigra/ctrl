import { Router } from 'express';
import { getCpuStats, getGpuStats } from './controller';
 
const router: Router = Router();

router.get('/monitor/cpu', getCpuStats);
router.get('/monitor/gpu', getGpuStats);

export default router;

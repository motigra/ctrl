import { Router } from 'express';
import { abilityDo, abilityGet, getVolumes, launchCalc, setVolumeByName } from './controllers';
import abilitiesRouter from './abilities/routes';
import { getAbility } from './abilities';
 
const router: Router = Router();

router.get('/api', abilityGet);
router.post('/api', abilityDo);

router.get('/volumes', getVolumes);
router.post('/volumes/:name', setVolumeByName);
router.post('/cmd/calc', launchCalc);

router.use(abilitiesRouter);

export default router;

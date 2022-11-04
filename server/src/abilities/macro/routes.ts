import { Router } from 'express';
import * as controller from './controller';
 
const router: Router = Router();

// router.get('/macro/winlock', controller.desktop);
// router.get('/macro/lorem', controller.typeLorem);
router.get('/macro/:name', controller.runMacro);
router.post('/macro/:name', controller.runMacro);

export default router;

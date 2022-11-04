import { Router } from 'express';

import applauncher from './applauncher/routes';
import macro from './macro/routes';

const abilitiesRouter: Router = Router();

abilitiesRouter.use(applauncher);
abilitiesRouter.use(macro);

export default abilitiesRouter;

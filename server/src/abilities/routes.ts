import { Router } from 'express';

import applauncher from './applauncher/routes';
import macro from './macro/routes';
import monitoring from './monitoring/routes';

const abilitiesRouter: Router = Router();

abilitiesRouter.use(applauncher);
abilitiesRouter.use(macro);
abilitiesRouter.use(monitoring);

export default abilitiesRouter;

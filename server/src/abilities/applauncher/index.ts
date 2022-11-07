import * as service from './service';
import IAbility from '../../common/IAbility';
import { Sub } from '../../../../common/types/dto';

class AppLauncher implements IAbility {

    constructor() { }

    async do(action: Sub): Promise<void | Sub[]> {
        const appName = action.name;
        if(!appName) throw 'no macro name provided';
        const result = await service.runApp(appName);
        const resultSub: Sub = {
            name: appName,
            args: { result }
        }
        return [resultSub];
    }

    async get(): Promise<Sub[]> {
        const manifest: Sub = {
            name: 'manifest',
            args: service.getManifest()
        };
        return [manifest];
    }
}

export default new AppLauncher();

import * as service from './service';
import IAbility from '../../common/IAbility';
import { Sub } from '../../../../common/types/dto';

class Volumes implements IAbility {

    constructor() { }

    async do(action: Sub): Promise<void | Sub[]> {
        return service.setVolumeByName(action.args.name, action.args.volume, action.args.muted);
    }

    async get(): Promise<Sub[]> {
        const volumes = await service.getVolumes();
        const result: Sub = {
            name: 'volume',
            args: volumes
        }
        return [result];
    }
}

export default new Volumes();

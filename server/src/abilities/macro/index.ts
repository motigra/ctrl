import * as service from './service';
import IAbility from '../../common/IAbility';
import { Sub } from '../../../../common/types/dto';

class Macro implements IAbility {

    constructor() { }

    async do(action: Sub): Promise<void | Sub[]> {
        const macroName = action.name;
        if(!macroName) throw 'no macro name provided';
        const macro = service[macroName];
        if(!macro) throw `macro ${macroName} not found`;
        return macro();
    }
}

export default new Macro();

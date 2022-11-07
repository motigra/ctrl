import { DTO, Sub } from '../../../common/types/dto';

interface IAbility {
    get?(): Promise<Array<Sub>>; 
    do?(action: Sub): Promise<Array<Sub> | void>;
}

export default IAbility;

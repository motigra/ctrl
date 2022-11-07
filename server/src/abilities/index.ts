import IAbility from '../common/IAbility';
import AppLauncher from './applauncher/';
import Macro from './macro/';

const abilities: Record<string, IAbility> = { AppLauncher, Macro };

const getAbility = (key: string) => {

    const abilityName = Object.keys(abilities).find(k => k.toLowerCase() === key.toLowerCase());
    if (!abilityName || !abilities[abilityName]) throw `No service called '${key}' was found`;
    return abilities[key];
}

export { abilities, getAbility };

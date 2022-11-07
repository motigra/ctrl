import { Response, Request } from 'express';
import * as Volumes from './vol';
import cmd from './cmd';
import { DTO, Sub } from '../../common/types/dto';
import { abilities, getAbility } from './abilities';

const abilityDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const actions = (req.body as DTO);
        const promises: Array<Promise<any>> = [];
        Object.keys(actions).forEach((key) => {
            const action = actions[key][0];
            promises.push(getAbility(key).do(action));
        });
        const responses = await Promise.all(promises);
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

const abilityGet = async (req: Request, res: Response): Promise<void> => {
    try {
        const info: DTO = {};
        for (const key in abilities) {
            if(abilities[key].get)
                info[key] = await abilities[key].get();
        }
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}


const setVolumeByName = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name } = req.params;
        const { volume, muted } = req.body;

        // request validation
        if (!name || name.trim() === '') throw 'no name provided';
        if (!volume) throw 'payload not valid';

        if (name.toLowerCase() === 'master') {
            Volumes.setMasterVolume({ vol: volume, muted });
        }
        else if (name.toLocaleLowerCase() === 'system') {
            Volumes.setApplicationVolume({ pid: 0, vol: volume, muted, name });
        }
        else {

            // get processes and find matches
            const procs = (await Volumes.getVolumeSessions()).filter((p: any) => p.name.toLowerCase() === name.toLowerCase());
            if (!procs || !procs.length) throw 'no apps found';

            procs.forEach((p) => {
                Volumes.setApplicationVolume({ pid: p.pid, name: p.name, vol: volume, muted });
            });
        }

        res.status(200).json({ name, volume, muted });
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

const getVolumes = async (req: Request, res: Response): Promise<void> => {
    try {
        const masterVolume = await Volumes.getMasterVolume();
        const appVolumes = await Volumes.getApplicationVolumes();
        const volumes = {
            master: masterVolume,
            apps: appVolumes
        };
        res.status(200).json({ volumes });
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
};

const launchCalc = async (req: Request, res: Response): Promise<void> => {
    try {
        await cmd('start calc');
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
};

export { getVolumes, launchCalc, setVolumeByName, abilityDo, abilityGet };

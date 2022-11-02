import { Response, Request } from 'express';
import * as Volumes from './vol';
import cmd from './cmd';
import { brotliDecompressSync } from 'zlib';

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

export { getVolumes, launchCalc, setVolumeByName };

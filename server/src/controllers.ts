import { Response, Request } from 'express';
import * as Volumes from './vol';

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

export { getVolumes };

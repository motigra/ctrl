import { Response, Request } from 'express';
import * as service from './service';

const getManifest = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = service.getManifest();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

const runApp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.params;
        await service.runApp(name);
        res.status(200).json(null);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

export { getManifest, runApp };

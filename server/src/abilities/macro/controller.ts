import { Response, Request } from 'express';
import * as service from './service';

const desktop = async (req: Request, res: Response): Promise<void> => {
    try {
        await service.desktop();
        res.status(200).json(null);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

const typeLorem = async (req: Request, res: Response): Promise<void> => {
    try {
        await service.typeLorem();
        res.status(200).json(null);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

export { desktop, typeLorem };

import { Response, Request } from 'express';
import * as service from './service';

const getCpuStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await service.cpuload();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

const getGpuStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await service.gpuload();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}


export { getCpuStats, getGpuStats };

import { Response, Request } from 'express';
import * as service from './service';

const runMacro = async (req: Request, res: Response): Promise<void> => {
    try {
        const macroName = req.params.name;
        if(!macroName) throw 'no macro name provided';
        const macro = service[macroName];
        if(!macro) throw `macro ${macroName} not found`;
        await macro();
        res.status(200).json(null);
    } catch (error) {
        res.status(500).json({ error });
        throw error;
    }
}

export { runMacro };

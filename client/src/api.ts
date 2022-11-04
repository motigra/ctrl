import { VolumeBase, AppVolume } from './volume.types';

const server = 'localhost';

const url = `http://${server}:3001/volumes`;

const getVolumes = async (): Promise<any> => {

    const res = await fetch(url);
    const json = await res.json();
    
    const masterVolume: VolumeBase = {
        volume: json.volumes.master.vol,
        muted: json.volumes.master.muted
    };

    const appVolumes: Array<AppVolume> = json.volumes.apps.map((app: any):any => {
        const appVolume: AppVolume = {
            pid: app.pid,
            name: app.name,
            muted: app.muted,
            volume: app.vol
        };
        return appVolume;
    })

    return {
        master: masterVolume,
        apps: appVolumes
    };

};

const launchCalc = async (): Promise<any> => {
    await fetch(`http://${server}:3001/cmd/calc`, {
        method: 'POST'
    });
    return;
}

const launchApp = async (name: string): Promise<any> => {
    await fetch(`http://${server}:3001/launch/${name}`, {
        method: 'POST'
    });
    return;
}

const updateVolume = async (name:string, volume:number, muted:boolean): Promise<any> => {
    const res = await fetch(`http://${server}:3001/volumes/${name}`, {
        method: 'POST',
        body: JSON.stringify({ volume, muted }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

export { getVolumes, launchCalc, updateVolume, launchApp };

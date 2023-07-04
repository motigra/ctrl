import * as Volumes from './vol';

const setVolumeByName = async (name: string, volume: number, muted: boolean): Promise<void> => {

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

    return;
}

const getVolumes = async (): Promise<any> => {
    const masterVolume = await Volumes.getMasterVolume();
    const appVolumes = await Volumes.getApplicationVolumes();
    const volumes = {
        master: masterVolume,
        apps: appVolumes
    };
    return volumes
};

export { getVolumes, setVolumeByName };

import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";
import { VolumeBase, AppVolume } from './volume.types';

const getMasterVolume = async (): Promise<VolumeBase> => {
    return new VolumeBase(
        Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar()*100),
        NodeAudioVolumeMixer.isMasterMuted()
    );
};

const getApplicationVolumes = async (): Promise<Array<AppVolume>> => {
    const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
    const apps = new Array<AppVolume>;
    sessions.forEach(s => {
        apps.push(new AppVolume(
            s.pid,
            s.name || (s.pid === 0 ? 'System' : ''),
            Math.round(NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(s.pid)*100),
            NodeAudioVolumeMixer.isAudioSessionMuted(s.pid)
        ));
    });
    return apps;
};

export { getMasterVolume, getApplicationVolumes };

import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";
import { VolumeBase, AppVolume } from './volume.types';

const getVolumeSessions = async (): Promise<any> => {
    return NodeAudioVolumeMixer.getAudioSessionProcesses();
}

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

const setMasterVolume = async (volume: VolumeBase): Promise<null> => {
    NodeAudioVolumeMixer.setMasterVolumeLevelScalar(volume.vol/100);
    NodeAudioVolumeMixer.muteMaster(volume.muted)
    return;
}

const setApplicationVolume = async (appVolume: AppVolume): Promise<null> => {
    console.log('set aop volume');
    console.log(appVolume);
    NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(appVolume.pid, appVolume.vol/100);
    NodeAudioVolumeMixer.setAudioSessionMute(appVolume.pid, appVolume.muted);
    return;
}

export { getVolumeSessions, getMasterVolume, getApplicationVolumes, setMasterVolume, setApplicationVolume };

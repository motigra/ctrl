class VolumeBase {
    public vol: number;
    public muted: boolean;

    constructor(vol?: number, muted?: boolean) {
        this.vol = vol || 0;
        this.muted = muted || false;
    }
}

class AppVolume extends VolumeBase {
    public pid: number;
    public name: string;

    constructor(pid: number, name?: string, vol?: number, muted?: boolean) {
        super(vol, muted);
        this.pid = pid;
        this.name = name || 'System';
    }
}

export { VolumeBase, AppVolume };

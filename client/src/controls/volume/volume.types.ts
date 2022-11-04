export type VolumeBase = {
    volume: number;
    muted: boolean;
}

export type AppVolume = VolumeBase & {
    name?: string;
    pid: number
}

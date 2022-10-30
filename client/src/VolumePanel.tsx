import React from 'react';
import Slider from './Slider';

type VolumeBase = {
    volume: number;
    muted: boolean;
}

type AppVolume = VolumeBase & {
    name?: string;
    pid: number
}

type VolumePanelProps = {};

type VolumePanelState = {
    master: VolumeBase;
    apps: Array<AppVolume>;
};

class VolumePanel extends React.Component<VolumePanelProps, VolumePanelState> {

    constructor(props: VolumePanelProps) {
        super(props);
        this.state = {
            master: { volume: 50, muted: false },
            apps: [
                { pid: 0, name: 'System', volume: 100, muted: false },
                { pid: 1, name: 'Chrome', volume: 100, muted: true },
                { pid: 2, name: 'Discord', volume: 100, muted: false }
            ]
        };
        this.updateAppVolumeState = this.updateAppVolumeState.bind(this);
    }

    updateAppVolumeState(pid: number, volume: number, muted: boolean) {
        const newState = this.state.apps.map((app: AppVolume) => {
            if (app.pid === pid) {
                app.volume = volume;
                app.muted = muted;
            }
            return app;
        });
        this.setState({ apps: newState });
    }

    render() {
        return (
            <div>
                <div>Volume Controls</div>
                <div>
                    <Slider
                        title={'Master'}
                        value={this.state.master.volume}
                        muted={this.state.master.muted}
                        onValueChange={ (value, muted) => {
                            this.setState({ master: { volume: value, muted: muted } });
                            console.log(`master vol: ${value} muted: ${muted}`);
                        }}
                    />
                </div>
                <div>
                    {
                        this.state.apps.map((app: AppVolume) => (
                            <Slider
                                title={app.name}
                                value={app.volume}
                                muted={app.muted}
                                onValueChange={ (value, muted) => {
                                    this.updateAppVolumeState(app.pid, value, muted);
                                    console.log(`app: ${app.name} vol: ${value} muted: ${muted}`)
                                }}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default VolumePanel;

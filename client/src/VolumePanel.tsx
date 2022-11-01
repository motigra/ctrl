import React from 'react';
import VolumeSlider from './VolumeSlider';
import { getVolumes } from './api';
import { VolumeBase, AppVolume } from './volume.types';
import './VolumePanel.css';

type VolumePanelProps = {};

type VolumePanelState = {
    master: VolumeBase;
    apps: Array<AppVolume>;
};

class VolumePanel extends React.Component<VolumePanelProps, VolumePanelState> {

    constructor(props: VolumePanelProps) {
        super(props);
        this.state = {
            master: { volume: 0, muted: false },
            apps: []
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

    async componentDidMount(): Promise<void> {
        const volumes = await getVolumes();
        this.setState({ master: { volume: volumes.master.volume, muted: volumes.master.muted }, apps: volumes.apps});
        console.log(volumes);
    }

    render() {
        return (
            <div className='volume-panel-wrapper'>
                <div className='volume-panel-row'>Volume Controls</div>
                <div className='volume-panel-row'>
                    <VolumeSlider
                        title={'Master'}
                        value={this.state.master.volume}
                        muted={this.state.master.muted}
                        onValueChange={ (value, muted) => {
                            this.setState({ master: { volume: value, muted: muted } });
                            console.log(`master vol: ${value} muted: ${muted}`);
                        }}
                    />
                </div>
                <div className='volume-panel-row'>
                    {
                        this.state.apps.map((app: AppVolume) => (
                            <VolumeSlider
                                key={app.pid}
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

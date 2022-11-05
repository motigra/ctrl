import React from 'react';
import * as api from '../../api';

type CpuLoadState = {
    load: number;
    temp?: number;
};

class CpuLoad extends React.Component<any, CpuLoadState> {

    constructor(props: any) {
        super(props);
        this.state = {
            load: 0
        };
        this.update = this.update.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.update();
        setInterval(this.update, 1000);
    }

    async update(): Promise<void> {
        const data = await api.getMonitoring('cpu');
        this.setState({ load: data.currentLoad.currentLoad });
    }

    render() {
        return (
            <div>
                <div>CPU</div>
                <div>{ this.state.load }%</div>
            </div>
        )
    }
}

export default CpuLoad;

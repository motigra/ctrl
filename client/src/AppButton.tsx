import React from 'react';
import * as api from './api';

type AppButtonProps = {
    name: string;
    title?: string;
    icon?: string;
}

class AppButton extends React.Component<AppButtonProps, {}> {
    constructor(props: AppButtonProps) {
        super(props);
        this.launchApp = this.launchApp.bind(this);
    }

    async launchApp() {
        await api.launchApp(this.props.name);
    }

    render() {
        return (
            <div><button onClick={this.launchApp}>{ this.props.title || this.props.name }</button></div>
        )
    }
}

export default AppButton;

import React from 'react';
import * as api from '../../api';
import icons from './icons';
import './Buttons.css';

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

    // 

    generateIconStyle(): React.CSSProperties {
        const image = this.props.icon || icons.power;
        return {
            backgroundImage: `url(${image})`
        }
    }

    render() {
        return (
            <div><button className='buttonControl' style={this.generateIconStyle()} onClick={this.launchApp}>{ this.props.title || this.props.name }</button></div>
        )
    }
}

export default AppButton;

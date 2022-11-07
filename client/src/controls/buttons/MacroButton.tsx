import React from 'react';
import * as api from '../../api';
import icons from './icons';
import './Buttons.css';

type MacroButtonProps = {
    name: string;
    title?: string;
    icon?: string;
}

class MacroButton extends React.Component<MacroButtonProps, {}> {
    constructor(props: MacroButtonProps) {
        super(props);
        this.runMacro = this.runMacro.bind(this);
    }

    async runMacro() {
        await api.runMacro(this.props.name);
    }

    generateIconStyle(): React.CSSProperties {
        const image = this.props.icon || icons.power;
        return {
            backgroundImage: `url(${image})`
        }
    }

    render() {
        return (
            <div className='buttonControl' onClick={this.runMacro}>
                <div className='buttonIcon' style={this.generateIconStyle()} ></div>
                <div className='buttonLabel'>{ this.props.title || this.props.name }</div>
            </div>
        )
    }
}

export default MacroButton;

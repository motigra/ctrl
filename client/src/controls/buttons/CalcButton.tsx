import React from 'react';
import { launchCalc } from '../../api';
import './Buttons.css';

class CalcButton extends React.Component {
    constructor() {
        super({})
    }

    async launchCalc() {
        await launchCalc();
    }

    render() {
        return (
            <div><button className='buttonControl' onClick={this.launchCalc}>Calc</button></div>
        )
    }
}

export default CalcButton;

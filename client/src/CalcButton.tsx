import React from 'react';
import { launchCalc } from './api';

class CalcButton extends React.Component {
    constructor() {
        super({})
    }

    async launchCalc() {
        await launchCalc();
    }

    render() {
        return (
            <div><button onClick={this.launchCalc}>Calc</button></div>
        )
    }
}

export default CalcButton;

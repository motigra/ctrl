import React from 'react';

type SliderState = {
    value: number,
    muted: boolean
};

type SliderProps = {
    title?: string,
    value?: number,
    muted?: boolean,
    onValueChange?: (value: number, muted: boolean) => void
};

class Slider extends React.Component<SliderProps, SliderState> {

    constructor(props: SliderProps) {
        super(props);
        this.state = {
            value: props.value || 0,
            muted: props.muted || false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMute = this.handleMute.bind(this);
        this.notifyStateChange = this.notifyStateChange.bind(this);
    }

    static getDerivedStateFromProps(props: SliderProps, current_state: SliderState) {
        if (current_state.value !== props.value || current_state.muted !== props.muted) {
            return {
                value: props.value,
                muted: props.muted
            };
        }
        return null;
    }

    handleChange(event: any) {
        const newState = { value: event.target.value, muted: this.state.muted };
        this.setState(newState);
        this.notifyStateChange(newState);
    }

    handleMute(event: any) {
        const newState = { value: this.state.value, muted: !this.state.muted };
        this.setState(newState);
        this.notifyStateChange(newState);
    }

    notifyStateChange(newState: SliderState) {
        if (this.props.onValueChange)
            this.props.onValueChange(newState.value, newState.muted);
    }

    render() {
        return (
            <div>
                <span>{this.props.title}</span>
                <span>{this.state.value}</span>
                <input type="range" min="0" max="100" value={this.state.value} onInput={this.handleChange} />
                <button onClick={this.handleMute}>{this.state.muted ? 'unmute' : 'mute'}</button>
            </div>
        );
    }
}

export default Slider;

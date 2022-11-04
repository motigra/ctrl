import React from 'react';
import debounce from 'lodash.debounce';
import './VolumeSlider.css';

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

class VolumeSlider extends React.Component<SliderProps, SliderState> {

    constructor(props: SliderProps) {
        super(props);
        this.state = {
            value: props.value || 0,
            muted: props.muted || false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMute = this.handleMute.bind(this);
        //this.notifyStateChange = this.notifyStateChange.bind(this);
    }

    // without this, master volume doesn't update when it is fetched from the server, because the props change but that doesn't automatically affect the state
    // this approach seems to cause the least amount of recalculations - only when props change, not reactive to internal state changes.
    componentDidUpdate(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>, snapshot?: any): void {
        if (prevProps.value !== this.props.value || prevProps.muted !== this.props.muted) {
            this.setState({
                value: this.props.value || 0,
                muted: this.props.muted || false
            });
        }
    }

    handleChange (event: any) {
        const newState = { value: parseInt(event.target.value), muted: this.state.muted };
        this.setState(newState);
        this.debouncedStateChange(newState);
    }

    handleMute(event: any) {
        const newState = { value: this.state.value, muted: !this.state.muted };
        this.setState(newState);
        this.debouncedStateChange(newState);
    }

    debouncedStateChange = debounce((newState) => {
        //this.setState(newState);
        this.notifyStateChange(newState);
    }, 500)

    notifyStateChange(newState: SliderState) {
        if (this.props.onValueChange)
            this.props.onValueChange(newState.value, newState.muted);
    }

    render() {
        return (
            <div className="volume-slider-wrapper">
                <span className='volume-slider-cell'>{this.props.title}</span>
                <span className='volume-slider-cell'>{this.state.value}</span>
                <span className='volume-slider-cell'><input type="range" min="0" max="100" value={this.state.value} onChange={this.handleChange} /></span>
                <span className='volume-slider-cell'><button onClick={this.handleMute}>{this.state.muted ? 'unmute' : 'mute'}</button></span>
            </div>
        );
    }
}

export default VolumeSlider;

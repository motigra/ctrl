import React from 'react';
import debounce from 'lodash.debounce';

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
        //this.notifyStateChange = this.notifyStateChange.bind(this);
    }

    // without this, master volume doesn't update when it is fetched from the server, because the props change but that doesn't automatically affect the state
    // this approach seems to cause the least amount of recalculations - only when props change, not reactive to internal state changes.
    componentDidUpdate(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>, snapshot?: any): void {
        if (prevProps.value !== this.props.value || prevProps.muted !== this.props.muted) {
            console.log('derived state');
            this.setState({
                value: this.props.value || 0,
                muted: this.props.muted || false
            });
        }
    }

    // static getDerivedStateFromProps(props: SliderProps, current_state: SliderState) {
    //     console.log('derived state');
    //     if (current_state.value !== props.value || current_state.muted !== props.muted) {
    //         return {
    //             value: props.value,
    //             muted: props.muted
    //         };
    //     }
    //     return null;
    // }

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
            <div>
                <span>{this.props.title}</span>
                <span>{this.state.value}</span>
                <input type="range" min="0" max="100" value={this.state.value} onChange={this.handleChange} />
                <button onClick={this.handleMute}>{this.state.muted ? 'unmute' : 'mute'}</button>
            </div>
        );
    }
}

export default Slider;

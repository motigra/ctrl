import React, { CSSProperties, ReactNode } from 'react';
import { VolumePanel, AppButton, MacroButton } from './controls';
import icons from './controls/buttons/icons';
import './ControlGrid.css';

type ControlGridItem = {
    title: string;
    rows: number;
    cols: number;
    component?: React.ComponentType<any>;
    props?: Object;
};

type ControlGridProps = {
    rows: number,
    cols: number
};

type ControlGridState = {
    items: Array<ControlGridItem>;
};

class ControlGrid extends React.Component<ControlGridProps, ControlGridState> {

    constructor(props: ControlGridProps) {
        super(props);
        this.state = {
            items: [
                { title: 'volume', rows: 2, cols: 3, component: VolumePanel },
                { title: 'discord', rows: 1, cols: 1, component: AppButton, props: { name: "discord", title: "Discord", icon: icons.discord }},
                { title: 'resolve', rows: 1, cols: 1, component: AppButton, props: { name: "resolve", title: "Resolve" }},
                { title: 'fusion360', rows: 1, cols: 1, component: AppButton, props: { name: "fusion360", title: "Fusion360" }},
                { title: 'vscode', rows: 1, cols: 1, component: AppButton, props: { name: "vscode", title: "VS Code", icon: icons.vscode }},
                { title: 'calc', rows: 1, cols: 1, component: AppButton, props: { name: "calc", title: "Calculator", icon: icons.calc }},
                { title: 'spotify', rows: 1, cols: 1, component: AppButton, props: { name: "spotify", title: "Spotify" }},
                { title: 'chrome', rows: 1, cols: 1, component: AppButton, props: { name: "chrome", title: "Chrome", icon: icons.chrome }},
                { title: 'affinity', rows: 1, cols: 1, component: AppButton, props: { name: "affinity", title: "Affinity" }},
                { title: 'mediaToggle', rows: 1, cols: 1, component: MacroButton, props: { name: "mediaToggle", title: "Play/Pause", icon: icons.playpause }},
                { title: 'mediaNext', rows: 1, cols: 1, component: MacroButton, props: { name: "mediaNext", title: "Next", icon: icons.next }},
                { title: 'mediaPrev', rows: 1, cols: 1, component: MacroButton, props: { name: "mediaPrev", title: "Prev", icon: icons.prev }},
                { title: 'desktop', rows: 1, cols: 1, component: MacroButton, props: { name: "desktop", title: "Desktop" }}
            ]
        };
    }

    

    generateContainerStyle(): CSSProperties {
        return {
            gridTemplateColumns : `repeat(${this.props.cols}, 1fr)`,
            gridTemplateRows : `repeat(${this.props.rows}, 1fr)`
        };
    }

    generateItemStyle(item: ControlGridItem): CSSProperties {
        return {
            gridRowEnd: `span ${item.rows}`,
            gridColumnEnd: `span ${item.cols}`
        }
    }

    calculateEmptyCells(): Array<number> {
        const cellsUsed = this.state.items.reduce((partialSum, item) => {
            return partialSum + (item.cols * item.rows);
        }, 0);
        const cellsEmpty = (this.props.cols*this.props.rows) - cellsUsed;
        return Array.from(Array(cellsEmpty).keys());
    }

    generateItemNode(item: ControlGridItem): ReactNode {

        if (!item.component) return item.title;

        const Component = item.component;

        return <Component {...item.props} />;
    }

    render() {
        return (
            <div className='grid-wrapper' style={this.generateContainerStyle()}>
                {
                    this.state.items.map((item) => (
                        <div key={item.title} className="grid-cell" style={this.generateItemStyle(item)}>
                            {
                                <>{this.generateItemNode(item)}</>
                            }
                        </div>
                    ))
                }
                {
                    this.calculateEmptyCells().map((n) => (
                        <div key={n} className="grid-cell">{n}</div>
                    ))
                }
            </div>
        );
    }
}

export default ControlGrid;

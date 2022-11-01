import React, { CSSProperties, ReactNode } from 'react';
import VolumePanel from './VolumePanel';
import './ControlGrid.css';

type ControlGridItem = {
    title: string;
    rows: number;
    cols: number;
    component?: React.ComponentType;
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
                { title: 'Volume', rows: 3, cols: 3, component: VolumePanel},
                // { title: 'square', rows: 2, cols: 2 },
                // { title: 'span', rows: 1, cols: 3 },
                // { title: 'smol', rows: 1, cols: 1 },
                // { title: 'tall', rows: 2, cols: 1 }
            ]
        };
    }

    generateContainerStyle(): CSSProperties {
        return {
            gridTemplateColumns : `repeat(${this.props.cols}, 1fr)`,
            gridTemplateRows : `repeat(${this.props.rows}, 1fr)`
        };
    }

    // grid-row-end: span 2

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
        return <Component />

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

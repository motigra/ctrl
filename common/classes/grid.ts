/**
 * Represents a single grid cell, agnostic to content
 */
type GridCell = {
    /** 0-based column index */
    x: number;
    /** 0-based row index */
    y: number;
    /** whether the cell is occupied by a control */
    occupied: boolean;
}

/**
 * Represents a grid layout (2d) of any size containing identically sized grid cells (no spans)
 */
class Grid {

    rows: number;
    columns: number;
    _cells: GridCell[];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this._cells = [];
        for (let i=0; i<(this.rows*this.columns); i++) {
            this._cells.push({...this.idx2coord(i), occupied: false})
        }
    }

    cell(x: number, y: number): GridCell {
        return this._cells[this.coord2idx(x, y)];
    }

    coord2idx(x: number, y: number): number {
        return (x + y * this.rows);
    }
    
    idx2coord(i: number): { x: number, y: number} {
        return {x: i % this.rows, y: Math.floor(i/this.rows)};
    }

    getCellsInRange(x: number, y: number, width: number, height: number): GridCell[] {

        const x2 = x+width-1, y2 = y+height-1;

        return this._cells.filter((cell) => {
            return (x <= cell.x && cell.x <= x2) && (y <= cell.y && cell.y <= y2);
        });
    }

    getAvailableCells(width: number, height: number): GridCell[] {

        const foundCells: GridCell[] = [];

        return this._cells.filter((cell) => {

            // If cell is taken, skip
            if (cell.occupied) return false;

            // if not enough space from edges
            if (cell.x+width > this.columns || cell.y+height > this.rows) return false;

            //console.log(`passed checks with x = ${cell.x}, y = ${cell.y}`);

            // Check if all neccessary cells are available
            // for (let x=cell.x;x<cell.x+width-1;x++) {
            //     for (let y=cell.y;y<cell.y+height-1;y++) {
            //         if (this._cells[this.coord2idx(x, y)].occupied) return false;
            //     }
            // }
            if (this.getCellsInRange(cell.x, cell.y, width, height).some(cell => cell.occupied)) return false;

            return true;

        });
    }
}



/*

| y/x | 0 | 1 | 2 | 3 |
|  0  | 0 | 1 | 2 | 3 |
|  1  | 4 | 5 | 6 | 7 |
|  2  | 8 | 9 | 10| 11|
|  3  | 12| 13| 14| 15|

*/


export { GridCell, Grid };

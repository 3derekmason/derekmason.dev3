import { type CELL, type COORDS, DIRECTION } from "../types";

/** The coordinates one tile away from `current`, in `direction`. */
export const getTargetCoords = (current: COORDS, direction: DIRECTION): COORDS => {
    const [currentX, currentY] = current;
    switch (direction) {
        case DIRECTION.UP:
            return [currentX, currentY - 1];
        case DIRECTION.DOWN:
            return [currentX, currentY + 1];
        case DIRECTION.LEFT:
            return [currentX - 1, currentY];
        case DIRECTION.RIGHT:
            return [currentX + 1, currentY];
    }
};

/** The cell at `coords`, or `undefined` if it's off the board. */
export const getCell = (coords: COORDS, board: CELL[][]): CELL | undefined => {
    const [x, y] = coords;
    const row = board[y];
    if (!row) return undefined;
    return row[x];
};

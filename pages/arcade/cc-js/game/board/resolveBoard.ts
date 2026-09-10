import { type CELL, type LEVEL, type OBJECT, type TILE } from "../types";

/**
 * Converts a level's numeric terrain grid and object list into a
 * grid of CELL objects, using the tile/object ID -> definition lookups
 * (see tiles/tiles.ts and tiles/objects.ts).
 */
export const resolveBoard = (
    level: LEVEL,
    tileDefs: Record<number, TILE>,
    objectDefs: Record<number, OBJECT>
): CELL[][] => {
    const board: CELL[][] = level.terrain.map((row) =>
        row.map((tileId) => ({ terrain: { ...tileDefs[tileId] } }))
    );

    level.objects.forEach(([objectId, [x, y]]) => {
        const row = board[y];
        const cell = row?.[x];
        const objectDef = objectDefs[objectId];
        if (!cell || !objectDef) return;
        cell.object = { ...objectDef };
    });

    return board;
};

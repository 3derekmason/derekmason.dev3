import { type CELL, type COORDS, DIRECTION, type PLAYER } from "../types";
import { getCell, getTargetCoords } from "./coords";
import { canEnterTile } from "./collision";

/**
 * Attempts to push the block sitting at `from` one tile further in
 * `direction`. Returns `true` if the block moved (or was consumed) and
 * `from` is now clear, `false` if the push is blocked (in which case
 * the board is left untouched).
 */
export const tryPushBlock = (
    board: CELL[][],
    from: COORDS,
    direction: DIRECTION,
    player: PLAYER
): boolean => {
    const originCell = getCell(from, board);
    if (!originCell?.object) return false;

    const beyondCoords = getTargetCoords(from, direction);
    const beyondCell = getCell(beyondCoords, board);

    if (!beyondCell) return false;
    if (beyondCell.object) return false; // can't push into another object
    if (!canEnterTile(beyondCell, player)) return false;

    if (beyondCell.terrain.type === "water") {
        // The block forms a makeshift bridge and is consumed in the process.
        beyondCell.terrain = { type: "dirt" };
    } else {
        beyondCell.object = originCell.object;
    }

    originCell.object = undefined;
    return true;
};

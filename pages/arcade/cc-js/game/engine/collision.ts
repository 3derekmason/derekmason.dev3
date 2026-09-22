import { type CELL, type PLAYER } from "../types";

/**
 * Can the player physically step onto this cell's
 * terrain? 
 * Does not apply any consequences of entering (those live in interactions.ts)
 * and it does not account for objects sitting on the cell (push-block
 * handling lives in push.ts / movement.ts, since it needs to inspect a
 * second cell beyond this one).
 */
export const canEnterTile = (cell: CELL | undefined, player: PLAYER): boolean => {
    // Out of bounds
    if (!cell) return false;

    const { terrain } = cell;

    if (terrain.collision) {
        // Locked doors open if the player holds a matching key.
        if (terrain.variant && player.keys.includes(terrain.variant)) return true;
        return false;
    }

    // Non-blocking terrain (including hazards like fire/water) can always be entered
    return true;
};

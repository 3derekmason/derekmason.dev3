import type { Ref } from "vue";
import { type BOOT_TYPE, type CELL, type COORDS, type GAME_STATUS, DIRECTION, type KEY_COLORS, type PLAYER } from "../types";
import {
    handleBootPickup,
    handleChipPickup,
    handleDirt,
    handleKeyPickup,
    handleKeyThief,
    handleLoseLevel,
    handleThief,
    handleWinLevel,
    openGates,
} from "./interactions";
import { canEnterTile } from "./collision";
import { tryPushBlock } from "./push";
import { getCell, getTargetCoords } from "./coords";

/**
 * Attempts to move the player one tile in `direction`.
 *
 * Returns `null` if the move is blocked (out of bounds, wall, locked
 * door, a push-block that can't be pushed, etc)... Returns the target
 * COORDS if the move is allowed.
 * Any side effects of entering that cell are triggered here, after entry is
 * confirmed but before the coordinates are handed back to the caller.
 */
export const handleMovement = (
    current: COORDS,
    direction: DIRECTION,
    board: CELL[][],
    player: PLAYER,
    status: Ref<GAME_STATUS>,
    totalChips: number
): COORDS | null => {
    const target = getTargetCoords(current, direction);
    const targetCell = getCell(target, board);

    if (targetCell?.object?.type === "push-block") {
        const pushed = tryPushBlock(board, target, direction, player);
        if (!pushed) return null;
    }

    if (!canEnterTile(targetCell, player)) return null;

    // canEnterTile only returns true when targetCell is defined.
    const cell = targetCell as CELL;
    const tile = cell.terrain;

    if (tile.type === "goal") {
        handleWinLevel(status);
    } else if (tile.damage && tile.isOn !== false) {
        const hasRequiredBoots = tile.requires
            ? player.boots.includes(tile.requires)
            : false;
        if (!hasRequiredBoots) handleLoseLevel(status);
    } else if (tile.steals === "boots") {
        handleThief(player);
    } else if (tile.steals === "keys") {
        handleKeyThief(player);
    } else if (tile.type === "dirt") {
        handleDirt(board, target);
    }

    if (cell.object) {
        const object = cell.object;
        if (object.type === "chip") {
            handleChipPickup(player);
            if (player.chipsCollected >= totalChips) openGates(board);
        } else if (object.type.startsWith("key-") && object.variant) {
            handleKeyPickup(player, object.variant as KEY_COLORS);
        } else if (object.type.startsWith("boot-") && object.variant) {
            handleBootPickup(player, object.variant as BOOT_TYPE);
        }
        cell.object = undefined;
    }

    return target;
};

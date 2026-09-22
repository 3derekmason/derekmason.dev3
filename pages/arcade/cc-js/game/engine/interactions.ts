import type { Ref } from "vue";
import { type BOOT_TYPE, type CELL, type COORDS, type KEY_COLORS, type PLAYER, GAME_STATUS } from "../types";
import { getCell } from "./coords";

/**
 * These handlers apply the side effects of successfully entering a
 * special tile/object. They are called from movement.ts once
 * `canEnterTile` (and, for push-blocks, `tryPushBlock`) has already
 * confirmed the move is allowed.
 */

export const handleWinLevel = (status: Ref<GAME_STATUS>) => {
    status.value = GAME_STATUS.WON;
};

export const handleLoseLevel = (status: Ref<GAME_STATUS>) => {
    status.value = GAME_STATUS.LOST;
};

export const handleThief = (player: PLAYER) => {
    player.boots = [];
};

export const handleKeyThief = (player: PLAYER) => {
    player.keys = [];
};

export const handleDirt = (board: CELL[][], coords: COORDS) => {
    const cell = getCell(coords, board);
    if (!cell) return;
    cell.terrain = { type: "empty" };
};

export const handleChipPickup = (player: PLAYER) => {
    player.chipsCollected += 1;
};

export const handleKeyPickup = (player: PLAYER, variant: KEY_COLORS) => {
    if (!player.keys.includes(variant)) player.keys.push(variant);
};

export const handleBootPickup = (player: PLAYER, variant: BOOT_TYPE) => {
    if (!player.boots.includes(variant)) player.boots.push(variant);
};

/**
 * Converts every "gate" tile on the board to empty tile
 */
export const openGates = (board: CELL[][]) => {
    board.forEach((row) =>
        row.forEach((cell) => {
            if (cell.terrain.type === "gate") cell.terrain = { type: "empty" };
        })
    );
};

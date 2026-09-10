import { type COORDS, DIRECTION, type PLAYER, type TILE } from "../types";
import { handleLoseLevel, handleWinLevel, handleThief, handleKeyThief, handleDirt } from "./interactions";

const getTargetTile = (current: COORDS, direction: DIRECTION, tiles: TILE[][]) => {
    const [currentX, currentY] = current;
    switch (direction) {
        case DIRECTION.UP:
            return tiles[currentY - 1][currentX];
        case DIRECTION.DOWN:
            return tiles[currentY + 1][currentX];
        case DIRECTION.LEFT:
            return tiles[currentY][currentX - 1];
        case DIRECTION.RIGHT:
            return tiles[currentY][currentX + 1];
    }
}

export const handleMovement = (current: COORDS, direction: DIRECTION, tiles: TILE[][], player: PLAYER) => {
    const targetTile = getTargetTile(current, direction, tiles);

    if (!targetTile) return null;

    if (targetTile.collision) {
        if (targetTile.variant && player.keys.includes(targetTile.variant)) {
            return targetTile;
        };

        if (targetTile.type === "goal") return handleWinLevel();

        if (targetTile.damage) {
            if (targetTile.requires) {
                if (player.boots.includes(targetTile.requires)) {
                    return targetTile;
                }
            }
            return handleLoseLevel();
        }

        if (targetTile.steals) {
            if (targetTile.steals === "boots") {
                return handleThief();
            }
            if (targetTile.steals === "keys") {
                return handleKeyThief();
            }
        }

        if (targetTile.type === "dirt") {
            return handleDirt();
        }

        return targetTile;
    }
}
import { ref } from "vue";
import { type CELL, type LEVEL, type PLAYER, DIRECTION, GAME_STATUS } from "../types";
import { resolveBoard } from "../board/resolveBoard";
import { tiles as tileDefs } from "../tiles/tiles";
import { objects as objectDefs, CHIP_OBJECT_ID } from "../tiles/objects";
import { handleMovement } from "./movement";
import { openGates } from "./interactions";

export const useGameState = (level: LEVEL) => {
    const board = ref<CELL[][]>(resolveBoard(level, tileDefs, objectDefs));

    const player = ref<PLAYER>({
        x: level.player.startX,
        y: level.player.startY,
        boots: [],
        keys: [],
        chipsCollected: 0,
    });

    const status = ref<GAME_STATUS>(GAME_STATUS.PLAYING);

    const totalChips = level.objects.filter(
        ([objectId]) => objectId === CHIP_OBJECT_ID
    ).length;

    // Levels with no chips at all have nothing to trigger the "last chip
    // collected" gate-opening side effect, so open them right away.
    // This is only a safeguard, every level should have at least one chip.
    if (totalChips === 0) openGates(board.value);

    const move = (direction: DIRECTION) => {
        if (status.value !== GAME_STATUS.PLAYING) return;

        const target = handleMovement(
            [player.value.x, player.value.y],
            direction,
            board.value,
            player.value,
            status,
            totalChips
        );

        if (!target) return;

        const [x, y] = target;
        player.value.x = x;
        player.value.y = y;
    };

    return { board, player, status, totalChips, move };
};

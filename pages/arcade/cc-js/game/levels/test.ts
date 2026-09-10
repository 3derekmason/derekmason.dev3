import { type LEVEL } from "../types";
import { CHIP_OBJECT_ID } from "../tiles/objects";

export const test: LEVEL = {
    id: 1,
    name: "test",
    terrain: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 2, 1, 0, 0, 0, 1],
        [1, 9, 9, 1, 3, 1, 8, 8, 8, 1],
        [1, 0, 0, 14, 14, 14, 0, 0, 0, 1],
        [1, 0, 0, 14, 0, 14, 0, 0, 0, 1],
        [1, 0, 0, 14, 14, 14, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    objects: [
        [CHIP_OBJECT_ID, [1, 1]],
        [CHIP_OBJECT_ID, [8, 1]],
        [10, [7, 6]],
        [5, [1, 8]]

    ],
    monsters: [],
    player: {
        startX: 4,
        startY: 4,
    },
};
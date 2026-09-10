import { type LEVEL } from "../types";
import { CHIP_OBJECT_ID } from "../tiles/objects";

export const level01: LEVEL = {
    id: 1,
    name: "Level 1",
    terrain: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 2, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 3, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],

    ],
    objects: [
        [CHIP_OBJECT_ID, [1, 1]],
        [CHIP_OBJECT_ID, [5, 1]],
        [CHIP_OBJECT_ID, [1, 5]],
        [CHIP_OBJECT_ID, [5, 5]],


    ],
    monsters: [],
    player: {
        startX: 3,
        startY: 5,
    },
};
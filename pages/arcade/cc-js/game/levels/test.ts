import { type LEVEL } from "../types";

export const test: LEVEL = {
    id: 1,
    name: "test",
    terrain: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ],
    objects: [],
    monsters: [],
    player: {
        startX: 2,
        startY: 2,
    },
};
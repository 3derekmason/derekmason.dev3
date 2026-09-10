import { type TILE, KEY_COLORS, BOOT_TYPE } from "../types";

export const tiles: Record<number, TILE> = {
    0: {
        type: "empty",
    },
    1: {
        type: "wall",
        collision: true,
    },
    2: {
        type: "goal",
    },
    3: {
        type: "gate",
        collision: true,
    },
    4: {
        type: "door-red",
        collision: true,
        variant: KEY_COLORS.RED,
    },
    5: {
        type: "door-green",
        collision: true,
        variant: KEY_COLORS.GREEN,
    },
    6: {
        type: "door-blue",
        collision: true,
        variant: KEY_COLORS.BLUE,
    },
    7: {
        type: "door-yellow",
        collision: true,
        variant: KEY_COLORS.YELLOW,
    },
    8: {
        type: "fire",
        requires: BOOT_TYPE.BOOTS,
        isOn: true,
    },
    9: {
        type: "water",
        requires: BOOT_TYPE.FLIPPERS,
    },
    10: {
        type: "ice",
        requires: BOOT_TYPE.SKATES,
        slippery: true,
    },
    11: {
        type: "force",
        requires: BOOT_TYPE.SUCTION,
    },
    12: {
        type: "thief",
        steals: "boots",
    },
    13: {
        type: "key-thief",
        steals: "keys",
    },
    14: {
        type: "dirt",

    },
    15: {
        type: "gravel",
        monsterCollision: true,
    },
    16: {
        type: "recessed-wall",
    },
    17: {
        type: "teleport",
    },
    18: {
        type: "blue-wall",
    },
    19: {
        type: "toggle",
    },
    20: {
        type: "trap",
        sticky: true,
    },
    21: {
        type: "trap-button",
    },
    22: {
        type: "cloner"
    },
    23: {
        type: "cloner-button",
    },
    24: {
        type: "fire-button",
    },
    25: {
        type: "force-button",
    }
}
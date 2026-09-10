import { type OBJECT, BOOT_TYPE, KEY_COLORS } from "../types";

export const objects: Record<number, OBJECT> = {
    /** The main objective of the game is to collect these */
    0: {
        type: "chip",
    },
    /** KEYS
     *  Collect these to open doors of the same color
     */
    1: {
        type: "key-red",
        variant: KEY_COLORS.RED,
    },
    2: {
        type: "key-green",
        variant: KEY_COLORS.GREEN,
    },
    3: {
        type: "key-blue",
        variant: KEY_COLORS.BLUE,
    },
    4: {
        type: "key-yellow",
        variant: KEY_COLORS.YELLOW,
    },
    /** BOOTS */
    5: {
        type: "boot-boots",
        variant: BOOT_TYPE.BOOTS,
    },
    6: {
        type: "boot-flippers",
        variant: BOOT_TYPE.FLIPPERS,
    },
    7: {
        type: "boot-skates",
        variant: BOOT_TYPE.SKATES,
    },
    8: {
        type: "boot-suction",
        variant: BOOT_TYPE.SUCTION,
    },
    /** You can push these one at a time to make a bridge or divert monsters. 
     *  If you push this into the water it will form dirt.
     */
    10: {
        type: "push-block",
    }
}
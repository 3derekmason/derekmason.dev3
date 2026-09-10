import { type TILE, KEY_COLORS, BOOT_TYPE } from "../types";

export const tiles: Record<number, TILE> = {
    /** This allows anything to move here */
    0: {
        type: "empty",
    },
    /** This allows nothing to move here */
    1: {
        type: "wall",
        collision: true,
    },
    /** Get to this to go to the next level */
    2: {
        type: "goal",
    },
    /** You are only able to unlock this when all the chips are collected */
    3: {
        type: "gate",
        collision: true,
    },
    /** DOORS
     *  You can only open this if you have a key of the same color
     */
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
    /** You can only step on fire safely with boots */
    8: {
        type: "fire",
        requires: BOOT_TYPE.BOOTS,
        isOn: true,
    },
    /** You can only step on water safely with flippers */
    9: {
        type: "water",
        requires: BOOT_TYPE.FLIPPERS,
    },
    /** You slide on ice unless you have skates */
    10: {
        type: "ice",
        requires: BOOT_TYPE.SKATES,
        slippery: true,
    },
    /** These force you to go a direction, unless you have the suction boots */
    11: {
        type: "force",
        requires: BOOT_TYPE.SUCTION,
    },
    /** This steals all of your boots */
    12: {
        type: "thief",
        steals: "boots",
    },
    /** This steals all of your keys */
    13: {
        type: "key-thief",
        steals: "keys",
    },
    /** Once you step on dirt, it goes away so anything can move here */
    14: {
        type: "dirt",

    },
    /** This is a safe hideout from monsters */
    15: {
        type: "gravel",
        monsterCollision: true,
    },
    /** This turns into a normal wall once you stand on it */
    16: {
        type: "recessed-wall",
    },
    /** Transports you to another teleport with the opposite direction open. 
     *  Finds next teleport in reading order 
     */
    17: {
        type: "teleport",
    },
    /** Some are fake, some are not, you will have to push on them to tell */
    18: {
        type: "blue-wall",
    },
    /** The  button toggles these blocks opened and closed */
    19: {
        type: "toggle",
    },
    /** Objects get stuck here unless something is on the button */
    20: {
        type: "trap",
        sticky: true,
    },
    21: {
        type: "trap-button",
    },
    /** The object on top of the cloner gets cloned when something steps on the red button */
    22: {
        type: "cloner"
    },
    23: {
        type: "cloner-button",
    },
    /** Turns fire to sticks and vice versa */
    24: {
        type: "fire-button",
    },
    /** Rotates the force square tiles in a clockwise direction */
    25: {
        type: "force-button",
    }
}
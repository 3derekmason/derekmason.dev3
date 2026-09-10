export enum KEY_COLORS {
    RED = "red",
    GREEN = "green",
    BLUE = "blue",
    YELLOW = "yellow",
}

export enum BOOT_TYPE {
    BOOTS = "boots",
    FLIPPERS = "flippers",
    SKATES = "skates",
    SUCTION = "suction",
}

export interface TILE {
    type: string;
    collision?: boolean;
    variant?: KEY_COLORS;
    isOn?: boolean;
    slippery?: boolean;
    steals?: "boots" | "keys";
    monsterCollision?: boolean;
    requires?: BOOT_TYPE;
    sticky?: boolean;
    damage?: boolean;
}

export interface OBJECT {
    type: string;
    collision?: boolean;
    variant?: KEY_COLORS | BOOT_TYPE;
}

export interface PLAYER {
    x: number;
    y: number;
    boots: BOOT_TYPE[];
    keys: KEY_COLORS[];
}

export interface LEVEL {
    id: number;
    name: string;
    terrain: number[][];
    objects: [type: number, location: COORDS][];
    monsters: [type: number, location: COORDS][];
    player: {
        startX: number;
        startY: number;
    }
}

export type COORDS = [number, number];

export enum DIRECTION {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right",
}
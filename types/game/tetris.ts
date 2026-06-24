export interface State {
    game: number[][];
    x: number;
    y: number;
    score: number;
}

export interface Key {
    code: string | undefined;
}

export type Brick = { value: number[][], color: string };
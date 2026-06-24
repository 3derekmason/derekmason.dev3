import type { State, Brick, Key } from '@/types/game/tetris';

// Constants
export const GAME_SIZE = 10;
export const BRICK_SIZE = 3;
export const EMPTY = 0;

export const BRICK_COLORS: Record<number, string> = {
    1: 'bg-tetris-a',
    2: 'bg-tetris-b',
    3: 'bg-tetris-c',
    4: 'bg-tetris-d',
    5: 'bg-tetris-e',
};

//game
const bricks: Brick[] = [
    {
        value: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ], color: 'bg-tetris-a'
    },
    {
        value: [
            [2, 2, 2],
            [0, 2, 0],
            [0, 0, 0]
        ], color: 'bg-tetris-b'
    },
    {
        value: [
            [0, 3, 3],
            [0, 3, 0],
            [0, 3, 0]
        ], color: 'bg-tetris-c'
    },
    {
        value: [
            [4, 4, 0],
            [0, 4, 0],
            [0, 4, 0]
        ], color: 'bg-tetris-d'
    },
    {
        value: [
            [5, 5, 0],
            [5, 5, 0],
            [0, 0, 0]
        ], color: 'bg-tetris-e'
    }
];

export const clearGame = () =>
    Array(GAME_SIZE)
        .fill(EMPTY)
        .map(e => Array(GAME_SIZE).fill(EMPTY));
export const updatePosition = (position: number, column: number) =>
    position === 0 ? column : position;
export const validGame = (game: number[][]) =>
    game.map(r => r.filter((_, i) => i < GAME_SIZE));
export const validBrick = (brick: number[][]) =>
    brick.filter(e => e.some(b => b !== EMPTY));
export const randomBrick = () =>
    bricks[Math.floor(Math.random() * bricks.length)];

export const score = (state: State): State =>
    (scoreIndex =>
        scoreIndex > -1
            ? ((state.score += 1),
                state.game.splice(scoreIndex, 1),
                (state.game = [Array(GAME_SIZE).fill(EMPTY), ...state.game]),
                state)
            : state)(state.game.findIndex(e => e.every(e => e !== EMPTY)));

export const initialState = {
    game: clearGame(),
    x: 0,
    y: 0,
    score: 0
};

// colllision
const isGoingToLevelWithExistingBricks = (
    state: State,
    brick: Brick
): boolean => {
    const gameHeight = state.game.findIndex(r => r.some(c => c !== EMPTY));
    const brickBottomX = state.x + brick.value.length - 1;
    return gameHeight > -1 && brickBottomX + 1 > gameHeight;
};

const areAnyBricksColliding = (state: State, brick: Brick): boolean =>
    validBrick(brick.value).some((r, i) =>
        r.some((c, j) =>
            c === EMPTY
                ? false
                : ((x, y) => state.game[x][y] !== EMPTY)(i + state.x, j + state.y)
        )
    );

const collideBrick = (
    state: State,
    brick: Brick,
    isGoingToCollide: boolean
): State => {
    const xOffset = isGoingToCollide ? 1 : 0;
    validBrick(brick.value).forEach((r, i) => {
        r.forEach(
            (c, j) =>
            (state.game[i + state.x - xOffset][j + state.y] = updatePosition(
                state.game[i + state.x - xOffset][j + state.y],
                c
            ))
        );
    });
    state.game = validGame(state.game);
    state.x = 0;
    state.y = GAME_SIZE / 2 - 1;
    return state;
};

export const collide = (state: State, brick: Brick): [State, Brick] => {
    const isGoingToCollide =
        isGoingToLevelWithExistingBricks(state, brick) &&
        areAnyBricksColliding(state, brick);

    const isOnBottom = state.x + validBrick(brick.value).length > GAME_SIZE - 1;

    if (isGoingToCollide || isOnBottom) {
        state = collideBrick(state, brick, isGoingToCollide);
        brick = randomBrick();
    }

    return [state, brick];
};

//rotation
const rightOffsetAfterRotation = (
    state: State,
    brick: Brick,
    rotatedBrick: Brick
) =>
    state.y + rotatedBrick.value.length === GAME_SIZE + 1 &&
        brick.value.every(e => e[2] === EMPTY)
        ? 1
        : 0;

const leftOffsetAfterRotation = (game: State) => (game.y < 0 ? 1 : 0);
const emptyBrick = (color: string): Brick =>
({
    value: Array(BRICK_SIZE)
        .fill(EMPTY)
        .map(e => Array(BRICK_SIZE).fill(EMPTY)), color: color
});
const rotateBrick = (
    state: State,
    brick: Brick,
    rotatedBrick: Brick
): [State, Brick] => (
    brick.value.forEach((r, i) =>
        r.forEach((c, j) => (rotatedBrick.value[j][brick.value[0].length - 1 - i] = c))
    ),
    (state.y -= rightOffsetAfterRotation(state, brick, rotatedBrick)),
    (state.y += leftOffsetAfterRotation(state)),
    [state, rotatedBrick]
);

export const rotate = (state: State, brick: Brick, key: Key): [State, Brick] =>
    key.code === 'ArrowUp'
        ? rotateBrick(state, brick, emptyBrick('transparent'))
        : [state, brick];

// keayboard
const xOffset = (brick: Brick, columnIndex: number) =>
    brick.value.every(e => e[columnIndex] === 0) ? 1 : 0;

export const handleKeyPress = (state: State, brick: Brick, key: Key): State => (
    (state.x += key.code === 'ArrowDown' ? 1 : 0),
    (state.y +=
        key.code === 'ArrowLeft' && state.y > 0 - xOffset(brick, 0)
            ? -1
            : key.code === 'ArrowRight' && state.y < GAME_SIZE - 3 + xOffset(brick, 2)
                ? 1
                : 0),
    state
);

export const resetKey = (key: Key) => (key.code = undefined);

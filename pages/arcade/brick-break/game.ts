import type { GameObject, Player, Ball } from '@/types/game/brick-break';

export const gameSize = 20;

export const EMPTY = 0;
export const PLAYER = 1;
export const BALL = 2;
export const BRICK = 3;
export const PADDLE_HALF = 1;
export const PADDLE_SPEED = 2;

export const createInitialPlayer = (): Player => ({
    x: gameSize - 2,
    y: (gameSize / 2) - 1,
    score: 0,
    lives: 3,
});

export const createInitialBall = (): Ball => ({
    x: gameSize / 2,
    y: gameSize - 3,
    dirX: 1,
    dirY: 1,
});

export const createBricks = (): GameObject[] => {
    const bricks: GameObject[] = [];
    for (let r = 1; r < 8; r++) {
        const start = r % 2 === 0 ? 1 : 0;
        for (let c = start; c < gameSize; c += 2) {
            bricks.push({ x: r, y: c });
        }
    }
    return bricks;
};

export const movePlayer = (player: Player, key: string): Player => {
    if (key === 'ArrowLeft') return { ...player, y: Math.max(PADDLE_HALF, player.y - PADDLE_SPEED) };
    if (key === 'ArrowRight') return { ...player, y: Math.min(gameSize - 1 - PADDLE_HALF, player.y + PADDLE_SPEED) };
    return player;
};

export const moveBall = (ball: Ball): Ball => {
    const dirX = ball.dirX * (ball.x > 0 ? 1 : -1);
    const dirY = ball.dirY * (ball.y > 0 && ball.y < gameSize - 1 ? 1 : -1);
    return {
        ...ball,
        dirX,
        dirY,
        x: ball.x + dirX,
        y: ball.y - dirY,
    };
};

export const processCollisions = (
    player: Player,
    ball: Ball,
    bricks: GameObject[],
): [Player, Ball, GameObject[]] => {
    let updatedBricks = [...bricks];
    let updatedBall = { ...ball };
    let updatedPlayer = { ...player };

    const collidingBrickIndex = updatedBricks.findIndex(
        e => e.x === updatedBall.x && e.y === updatedBall.y,
    );

    if (collidingBrickIndex > -1) {
        updatedBricks.splice(collidingBrickIndex, 1);
        updatedBall.dirX *= -1;
        updatedPlayer.score++;
    }

    if (updatedPlayer.x === updatedBall.x && Math.abs(updatedPlayer.y - updatedBall.y) <= PADDLE_HALF) {
        updatedBall.dirX *= -1;
    }

    if (updatedBall.x > updatedPlayer.x) {
        updatedPlayer.lives--;
        updatedBall = { ...updatedBall, x: (gameSize / 2) - 3 };
    }

    return [updatedPlayer, updatedBall, updatedBricks];
};

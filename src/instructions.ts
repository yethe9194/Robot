// Fichier qui liste les instructions du robot : MOVE, LEFT, RIGHT, CALL_I
import { readFileSync } from 'fs';
import { program } from './functions';
import { Cell, Robot, Color, Direction } from "./world";
import type { Stack } from './stack';
import { Dir } from 'fs';

function getPuzzles() {
    const jsonData = readFileSync('share/puzzles.small.json').toString() ;
    return JSON.parse(jsonData) ;
}

type instructions = {Name: string, x: number, c: Color};

const actions = {
    MOVE: (robot: Robot) => {
        const mods = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // E, N, W, S
        const [dc, dr] = mods[robot.dir % 4];
        robot.col += dc;
        robot.row += dr;
        return [robot.col, robot.row];
    },
    LEFT: (robot: Robot) => {
        robot.dir = (robot.dir + 3) % 4 as Direction;
        return robot.dir;
    },
    RIGHT: (robot: Robot) => {
        robot.dir = (robot.dir + 1) % 4 as Direction;
        return robot.dir;
    }
};

function executeIfColorMatches<T>(aRobot: Robot, aColor: Color, aCell: Cell, action: () => T, defaultValue: T): T {
    if (aCell.color === 'N') throw new Error('Invalid cell');
    if (aCell.color === aColor) {
        return action();
    }
    return defaultValue;
}

function moveForward(aRobot: Robot, aColor: Color, aCell: Cell) {
    return executeIfColorMatches(aRobot, aColor, aCell, () => actions.MOVE(aRobot), [aRobot.col, aRobot.row]);
}

function turnLeft(aRobot: Robot, aColor: Color, aCell: Cell) {
    return executeIfColorMatches(aRobot, aColor, aCell, () => actions.LEFT(aRobot), aRobot.dir);
}

function turnRight(aRobot: Robot, aColor: Color, aCell: Cell) {
    return executeIfColorMatches(aRobot, aColor, aCell, () => actions.RIGHT(aRobot), aRobot.dir);
}

function callFunction(aRobot: Robot, playerProgram: program, x: number, aColor: Color, aCell: Cell): Stack {
    return executeIfColorMatches(aRobot, aColor, aCell, () => {
        if (x >= playerProgram.size || x < 0) throw new Error("Out of range");
        return playerProgram.prog[x].func;
    }, []);
}

export { instructions, moveForward, turnLeft, turnRight, callFunction, Color } ;

import { functions } from './functions';
import { puzzle, Direction } from './puzzle';

type Color = 'B' | 'R' | 'G' | 'N'; 

type Cell={
    color: Color ;
    hasStar: boolean;
};

type Robot = {
  col: number;
  row: number;
  dir: Direction;
};

type World = {
  cells: Cell[][];
  robot: Robot;
  rows: number;
  cols: number;
};

type gameState = {
  starsRemaining: number;
  posRobot: [number, number, number];
  stackState: [[functions, number], [functions, number], [functions, number], [functions, number], [functions, number]];
};

function ConfigCell(ch: string): Cell {
  if (ch === 'B') return { color: 'B', hasStar: true };
  if (ch === 'R') return { color: 'R', hasStar: true };
  if (ch === 'G') return { color: 'G', hasStar: true };
  if (ch === ' ') return { color: 'N', hasStar: false };
  if (ch === 'b') return { color: 'B', hasStar: false };
  if (ch === 'r') return { color: 'R', hasStar: false };
  if (ch === 'g') return { color: 'G', hasStar: false };
  throw  Error('Incorrect world error');
  
}

//Takes the string representing the board and returns an array of board rows
function boardStringToArray(aBoard: string, rows: number, cols: number): string[] {
    return Array.from({length: rows}).map((_, i) => {
      const start = cols * i;
      return aBoard.slice(start, start + cols);
    });
}


function ConfigBoard(aBoard: string, rows: number, cols: number): Cell[][] {
  if (aBoard === "") throw new Error('Empty string');
  const lines: string[] = boardStringToArray(aBoard, rows, cols);
  const width: number = lines[0].length;
  return lines.map(line => {
    if (line.length !== width) throw new Error('Incorrect world error');
    return line.split('').map(ConfigCell);
  }); 
}

function ConfigRobot(robotCol: number, robotRow: number, robotDir: Direction): Robot {
  const robot : Robot = {col : robotCol, row : robotRow, dir : robotDir};
  return robot;
}

function ConfigWorld(aPuzzle: puzzle, rows : number, cols : number): World {
  const world : World = {cells : ConfigBoard(aPuzzle.board, rows, cols), robot : ConfigRobot(aPuzzle.robotCol, aPuzzle.robotRow, aPuzzle.robotDir), rows : rows, cols : cols};
  return world;
}

function isAccessible(world: World, row: number, col: number): boolean {
  if (row < 0 || row >= world.rows) return false;
  if (col < 0 || col >= world.cols) return false;
  return world.cells[row][col].color !== 'N'; 
}


export{  boardStringToArray, ConfigBoard , ConfigCell , ConfigRobot , ConfigWorld, isAccessible };
export type {Color, Cell , Direction, Robot, World};

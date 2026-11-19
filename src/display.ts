import { puzzle } from './puzzle';
import { Cell, ConfigCell } from './world';


const displayColors = {
        reset:   '\x1b[0m',
        blue:    '\x1b[44m\x1b[97m',
        green:   '\x1b[42m\x1b[97m',
        red:     '\x1b[41m\x1b[97m',
        star:    '\x1b[44m\x1b[93m',
        empty:   '\x1b[40m\x1b[90m',
    };

const robotIcons: string[] = ['▶', '▼', '◀', '▲'];
const starIcon: string = "★";


const colorMap: Record<string, string> = {
    "B": displayColors.blue,
    "G": displayColors.green,
    "R": displayColors.red,
    "N": displayColors.empty,
};



const getBgColor = (color: string) : string => {
    const bgColor = colorMap[color]; 
    if (!bgColor) throw new Error("Invalid Color");
    return bgColor;
};

const getContent = (aPuzzle: puzzle, currentCell: Cell, row: number, col: number): string => {
    if (aPuzzle.robotCol === col && aPuzzle.robotRow === row)
        return robotIcons[aPuzzle.robotDir];
    if (currentCell.hasStar)
        return starIcon;
    return ' ';
};

const makeCell = (aPuzzle: puzzle, row: number, col: number, cols: number): string => {
    const currentCell: Cell = ConfigCell(aPuzzle.board[row * cols + col]);
    const bgColor = getBgColor(currentCell.color);
    const content = getContent(aPuzzle, currentCell, row, col);
    return `${bgColor} ${content} ${displayColors.reset}`;
};

const makeLine = (aPuzzle: puzzle, cols: number, row: number): string =>
    '  |' + Array.from({length: cols}, (_, col) =>
        makeCell(aPuzzle, row, col, cols)
    ).join('') + '|';

const makeLines = (aPuzzle: puzzle, rows: number, cols: number): string[] =>
    Array.from({length: rows}, (_, row) =>
        makeLine(aPuzzle, cols, row)
    );

function displayPuzzle(aPuzzle: puzzle, cols: number, rows: number): boolean{
    console.log();
    console.log(`  Puzzle #${aPuzzle.id}: ${aPuzzle.title}`);
    console.log('  +' + '---'.repeat(cols) + '+');
    makeLines(aPuzzle, rows, cols).forEach(line => console.log(line));
    console.log('  +' + '---'.repeat(cols) + '+');
    console.log();
    return true;
}

const rows = 12;
const cols = 16;

const puzzle1: puzzle = {
  "id":14,"title":"Can you reach the stars?","about":"This puzzle is dedicated to those that enjoy bad puns.",
  "robotCol":1,"robotRow":8,"robotDir":3,"subs":[10,2,2,0,0],"allowedCommands":0,
  "board":"                     rrr         rr rrBrrrr rrr  brrrBbBrBrrrBr  bBrBbBbbbbrbbb  bbbbbrbbbBBbBb  bbBBrrbbbrrbbb  bBrrrrrBrrrrBr  rrr   rbr  rrr        rBr             rrr                      "
};

displayPuzzle(puzzle1, rows, cols);

export { displayPuzzle };

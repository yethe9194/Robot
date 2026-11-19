import { displayPuzzle } from '../src/display';
import { puzzle } from '../src/puzzle';

const rows = 12;
const cols = 16;

const puzzle1: puzzle = {
  "id":14,"title":"Can you reach the stars?","about":"This puzzle is dedicated to those that enjoy bad puns.",
  "robotCol":1,"robotRow":8,"robotDir":3,"subs":[10,2,2,0,0],"allowedCommands":0,
  "board":"                     rrr         rr rrBrrrr rrr  brrrBbBrBrrrBr  bBrBbBbbbbrbbb  bbbbbrbbbBBbBb  bbBBrrbbbrrbbb  bBrrrrrBrrrrBr  rrr   rbr  rrr        rBr             rrr                      "
};

const puzzle2: puzzle = {
  "id":15,"title":"The star-studded path III","about":"Can you do it with just six (or even fewer) commands?",
  "robotCol":3,"robotRow":11,"robotDir":3,"subs":[6,0,0,0,0],"allowedCommands":0,
  "board":"      bbb bbb      bbbRRRbRRRb    bRRRRbRRRbRb    bRbbbbbbbbRb    bRRRRRRRRbRb     bbbbbbbRbRb           bRbRb      bbb  bRbRb     bRRRb bRbRb    bRRbRbbbbbRb    bRbbRRRRRRRb    brbbbbbbbbb   "
};

const puzzle3: puzzle = {
  "id":89,"title":"Cat","about":"Try to find minimal solution ;)",
  "robotCol":15,"robotRow":10,"robotDir":2,"subs":[10,10,10,10,10],"allowedCommands":0,
  "board":"gggggggggggggggggBgggggggBggBggggBBBgggggBBBBggggggBgggggBggBggggggBBBBBBBggBggggggBggggggggBggggggBBBBBBBBBBggggggBgBgggBggBggggggBgBgggBggBggggggBgBgggBggBgggbbbRbRbbbRbbRbbbgggggggggggggggg"
};

const puzzle4: puzzle = {"id":0, "title": "empty", "about":"empty","robotCol":0,"robotRow":0,"robotDir":0,"subs":[0,0,0,0,0],"allowedCommands":0,"board":""};

describe("Testing display", () => {
    test("Test 1", () => {
        expect(displayPuzzle(puzzle1, rows, cols)).toBe(true);
    });
    test("Test 2", () => {
        expect(displayPuzzle(puzzle2, rows, cols)).toBe(true);
    });
    test("Test 3", () => {
        expect(displayPuzzle(puzzle3, rows, cols)).toBe(true);
    });
    
    test("Test 4", () => {
        expect(() => displayPuzzle(puzzle4, rows, cols)).toThrow(Error);
    });
});

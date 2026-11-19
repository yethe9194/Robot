import { instructions } from "../src/instructions";
import { program, functions } from "../src/functions";
import { puzzle } from "../src/puzzle";
import { World, ConfigWorld } from "../src/world";
import { Simulate, execSimple, moveIsValid } from "../src/solve";

const rows: number = 12;
const cols: number = 16;

const instruct1: instructions = {Name : "MOVE", x: -1, c : 'B'};
const instruct2: instructions = {Name : "LEFT", x: -1, c : 'B'};
const instruct3: instructions = {Name : "RIGHT", x : -1, c : 'B'};
const instruct4: instructions = {Name : "CALL", x: 0, c : 'B'};

const func1: functions = {func: [instruct1, instruct2, instruct1, instruct3, instruct4], size: 5};

const myProgram: program = {prog: [func1], size: 1};



const aPuzzle: puzzle = {
		"id":27,
		"title":"Stairs",
		"about":"",
		"robotCol":3,
		"robotRow":10,
		"robotDir":0,
		"subs":[10,0,0,0,0],
		"allowedCommands":0,
		"board":"                            BB             BB             BB             BB             BB             BB             BB             BB             BB             bB                           "
};

const aPuzzle1: puzzle = {
		"id":27,
		"title":"Stairs",
		"about":"",
		"robotCol":3,
		"robotRow":10,
		"robotDir":2,
		"subs":[10,0,0,0,0],
		"allowedCommands":0,
		"board":"                            BB             BB             BB             BB             BB             BB             BB             BB             BB             bB                           "
};
const aWorld: World = ConfigWorld(aPuzzle, rows, cols);
const aWorld1: World = ConfigWorld(aPuzzle1, rows, cols);

describe("Testing solve functions", () => {
    test("Testing moveIsValid", () => {
        expect(moveIsValid(aWorld)).toBe(true);
    });

    test("Testing moveIsNotValid", () => {
        expect(moveIsValid(aWorld1)).toBe(false);
    });

    test("Testing moving forward", () => {
        execSimple(aWorld, instruct1, aWorld.cells[aWorld.robot.row][aWorld.robot.col]);
    });

    test("Testing a game simulation", () => {
        expect(Simulate(aPuzzle, myProgram, rows, cols));
    });
});

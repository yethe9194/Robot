import {moveForward, turnLeft, turnRight, callFunction, Color} from "../src/instructions";
import {Cell, Robot, ConfigRobot} from "../src/world";
import {functions, program} from "../src/functions";

const robot: Robot = ConfigRobot(4,3,1);

const cell: Cell = {
	color: "B",
	hasStar: false
};

const F1: functions = {
	func : [
		{Name: "LEFT", x: 0, c: "B"},
		{Name: "LEFT", x: 1, c: "G"},
	],
	size: 2
};



const F2: functions = {
	func : [
		{Name: "MOVE", x: 0, c: "B"},
		{Name: "CALL", x: 1, c: "R"},
	],
	size: 2
};

const F3: functions = {
    func : [{Name: "", x:0,c:"N"}],
    size: 0
};

const Program: program = {
	prog : [F1,F2],
	size : 2
};

const Program1: program = {
	prog : [F3,F2],
	size : 2
};

test("cell color is the right one", () => {
	expect(cell.color).toBe("B");
});

test("cell does not have a star", () => {
	expect(cell.hasStar).toBe(false);
});

test('move from column 4 row 3 to column 4 row 4', () => {
	expect(moveForward(robot,"B",cell)).toEqual([4,4]);
});


test('turn from south to east', () => {
	expect(turnLeft(robot,"B",cell)).toBe(0);
});

test('turn from east to south', () => {
	expect(turnRight(robot,"B",cell)).toBe(1);
});

test('move from column 4 row 3 to column 4 row 2', () => {
	expect(moveForward(robot,"B",cell)).toEqual([4,5]);
});



test('call function is operable', () => {
	expect(callFunction(robot, Program, 1, "B",cell)).toStrictEqual([{Name: "MOVE", x: 0, c: "B"},{Name: "CALL", x: 1, c: "R"}]);
});

test('call function out of range', () => {
	expect(() => callFunction(robot, Program, 2, "B",cell)).toThrow(Error);
});

test('call function out of range negatively', () => {
	expect(() => callFunction(robot, Program, -1, "B",cell)).toThrow(Error);
});
test('Call empty function', () => {
    expect(callFunction(robot, Program1, 0, "B", cell)).toStrictEqual([{Name: "",x:0, c:"N"}]);
});

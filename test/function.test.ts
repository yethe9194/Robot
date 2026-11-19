import { functions, program } from '../src/functions';
import { instructions, Color } from '../src/instructions';

const F1: functions = { 
    func: [
        {Name: "MOVE", x: 0, c: "B"}, 
        {Name: "LEFT", x: 0, c: "B"},
        {Name: "RIGHT", x: 0, c: "B"},
        {Name: "CALL", x: 1, c: "R"}
    ],
    size: 4
} ;

const F2: functions = {
    func: [
        {Name: "MOVE", x: 0, c: "R"}, 
        {Name: "CALL", x: 0, c: "G"}
    ],
    size: 2
};

const Program: program = {
    prog: [F1, F2],
    size: 2
};


test("program size is ok", () => {
	expect(Program.size).toBe(2);
});

test("function first instruction of first function is ok", () => {
	expect(Program.prog[0].func[0].Name).toBe("MOVE");
	expect(Program.prog[0].func[0].x).toBe(0);
	expect(Program.prog[0].func[0].c).toBe("B");
});

test("function second instruction of first function is ok", () => {
	expect(Program.prog[0].func[1].Name).toBe("LEFT");
	expect(Program.prog[0].func[1].x).toBe(0);
	expect(Program.prog[0].func[1].c).toBe("B");
});

test("function first instruction of second function is ok", () => {
	expect(Program.prog[1].func[0].Name).toBe("MOVE");
	expect(Program.prog[1].func[0].x).toBe(0);
	expect(Program.prog[1].func[0].c).toBe("R");
});

test("function last instruction of second function is ok", () => {
	expect(Program.prog[1].func[1].Name).toBe("CALL");
	expect(Program.prog[1].func[1].x).toBe(0);
	expect(Program.prog[1].func[1].c).toBe("G");
});




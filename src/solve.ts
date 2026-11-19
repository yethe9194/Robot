import { instructions, moveForward, turnRight, turnLeft, callFunction } from "./instructions";
import { program } from "./functions";
import { puzzle } from "./puzzle";
import { World, ConfigWorld,Cell, isAccessible} from "./world";
import { access } from "node:fs";
import { Stack, stackIsEmpty, stackPeek, stackPop, stackPush } from './stack';
import { allStarsCollected, collectStar } from './goals';
import { execSync } from "node:child_process";

function moveIsValid(aWorld : World) : boolean {
    switch(aWorld.robot.dir){
        case 0:
            return isAccessible(aWorld, aWorld.robot.row, aWorld.robot.col + 1);
        case 1:
            return isAccessible(aWorld, aWorld.robot.row + 1, aWorld.robot.col);
        case 2:
            return isAccessible(aWorld, aWorld.robot.row, aWorld.robot.col - 1);
        case 3:
            return isAccessible(aWorld, aWorld.robot.row - 1, aWorld.robot.col);
        default:
            return false;
    }
}

function execInstruct(aWorld: World, aProgram: program, aStack: Stack): World {
    aWorld = collectStar(aWorld, aWorld.robot.row,aWorld.robot.col);
    if (aStack.length === 0 || allStarsCollected(aWorld)) {
        return aWorld;
    }

    const head = stackPeek(aStack);
    aStack = stackPop(aStack);
    const cell = aWorld.cells[aWorld.robot.row][aWorld.robot.col];

    if (head.Name === "CALL") {
        const newInstructions = callFunction(aWorld.robot, aProgram, head.x, head.c, cell);
        stackPush(stackPeek(newInstructions), aStack);
        stackPop(newInstructions);
        return execInstruct(aWorld, aProgram, aStack);
    } else {
        const nextWorld = execSimple(aWorld, head, cell);
        return execInstruct(nextWorld, aProgram, aStack); 
    }
}

function execSimple(aWorld: World, anInstruction: instructions, aCell: Cell): World {
    switch (anInstruction.Name) {
        case "MOVE":
            if (moveIsValid(aWorld)) {
                moveForward(aWorld.robot, anInstruction.c, aCell);
                aWorld.cells[aWorld.robot.row][aWorld.robot.col].hasStar = false;
            } else {
                throw new Error("Inaccessible cell!");
            }
            break;

        case "RIGHT":
            turnRight(aWorld.robot, anInstruction.c, aCell);
            break;

        case "LEFT":
            turnLeft(aWorld.robot, anInstruction.c, aCell);
            break;
    }
    return aWorld;
}

function execProgram(aWorld: World, aProgram: program): World {
    const initialStack = aProgram.prog[0].func;
    return execInstruct(aWorld, aProgram, initialStack);
}

function Simulate(aPuzzle: puzzle, aProgram: program, rows: number, cols: number): World {
    const aWorld : World = ConfigWorld(aPuzzle, rows, cols);

    execProgram(aWorld, aProgram);

    if (allStarsCollected(aWorld))
        console.log("CONGRATULATIONS! YOU WON!\n");
    else
        console.log("WOMP WOMP, YOU LOST!\n");

    return aWorld ;
}

export { Simulate, execProgram, execSimple, moveIsValid };


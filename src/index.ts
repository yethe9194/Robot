import { ConfigWorld, World, Cell, Color, Robot} from './world';
import { countRemainingStars } from './goals';
import { callFunction, instructions} from './instructions';
import { execSimple,Simulate } from './solve';
import { functions, program } from './functions';
import { puzzle } from './puzzle';
import { Stack, stackIsEmpty, stackPeek, stackPop } from './stack';

const CELL_SIZE = 32;

const drawCell = (ctx: CanvasRenderingContext2D, x: number, y: number, aCell: Cell): void => {
    switch (aCell.color) {
        case 'B': ctx.fillStyle = '#3498db'; break;
        case 'R': ctx.fillStyle = '#e74c3c'; break;
        case 'G': ctx.fillStyle = '#2ecc71'; break;
        case 'N': ctx.fillStyle = '#2c3e50'; break;
        default: ctx.fillStyle = '#000000';
    }
    //On peint le rectangle de la case ; x et y sont les indices, on les multiplie par la taille d'une case en pixels
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    if (aCell.hasStar) {
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 6, 0, Math.PI * 2);
        ctx.fill();
    }
};

const drawRobot = (ctx: CanvasRenderingContext2D, aRobot: Robot): void => {
    ctx.save();
    // On déplace le point d'origine (0,0) du canvas au centre de la case du robot
    ctx.translate(
        aRobot.col * CELL_SIZE + CELL_SIZE / 2,
        aRobot.row * CELL_SIZE + CELL_SIZE / 2
    );
    //On fait tourner le robot selon sa direction (East, South, West, North)
    ctx.rotate((aRobot.dir) * (Math.PI / 2));

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(CELL_SIZE/3, 0);
    ctx.lineTo(-CELL_SIZE/3, CELL_SIZE/3); 
    ctx.lineTo(-CELL_SIZE/3, -CELL_SIZE/3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
};

const renderWorld = (ctx: CanvasRenderingContext2D, aWorld: World): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) ;
    // Parcours du monde (grille 12x16)
    aWorld.cells.forEach((row, y) => {
        row.forEach((cell, x) => {
            drawCell(ctx, x, y, cell) ;
        }) ;
    }) ;

    drawRobot(ctx, aWorld.robot);
};

const renderStack = (stack: Stack): void => {
    const stackList = document.getElementById('stack-list');
    if (!stackList) return;

    //On vide l'affichage précédent
    stackList.innerHTML = '';

    if (stackIsEmpty(stack)) {
        const emptyLi = document.createElement('li');
        emptyLi.textContent = "Pile vide (Fin du programme)";
        emptyLi.style.fontStyle = "italic";
        stackList.appendChild(emptyLi);
        return;
    }

    //On parcourt la pile pour créer un élément de liste par instruction
    stack.forEach((instruction, index) => {
        const li = document.createElement('li');
        
        //On formate le texte pour qu'il soit lisible. 
        let text = `${instruction.Name}`;
        if (instruction.Name === 'CALL') {
            text += ` F${instruction.x}`; // Ajoute l'index de la fonction appelée
        }
        text += ` [${instruction.c}]`; // Ajoute la condition de couleur

        li.textContent = text;

        if (index === 0) {
            li.style.fontWeight = 'bold';
            li.style.color = '#e74c3c';
            li.textContent = "▶ " + text;
        }

        stackList.appendChild(li);
    });
};

window.addEventListener ('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const myPuzzle: puzzle = {
    "id":27,"title":"Stairs","about":"",
    "robotCol":3,"robotRow":10,"robotDir":0,"subs":[10,0,0,0,0],"allowedCommands":0,
    "board":"                            BB             BB             BB             BB             BB             BB             BB             BB             BB             bB                           "
    };

    const instruct1: instructions = {Name : "MOVE", x: -1, c : 'B'};
    const instruct2: instructions = {Name : "LEFT", x: -1, c : 'B'};
    const instruct3: instructions = {Name : "RIGHT", x : -1, c : 'B'};
    const instruct4: instructions = {Name : "CALL", x: 0, c : 'B'};

    const func1: functions = {func: [instruct1, instruct2, instruct1, instruct3, instruct4], size: 5};
    const myProgram: program = {prog: [func1], size: 1};
    let myWorld: World = ConfigWorld(myPuzzle, 12, 16);
    const instructionIndex = 0;
    const programActions = myProgram.prog[0].func;
    let myStack: Stack = [];
    
    const updateStarsDisplay = (world: World): void => {
        const starsSpan = document.getElementById('stars-count');
        if (starsSpan) {
            starsSpan.textContent = countRemainingStars(myWorld).toString();
        }
    };

    //First display
    renderWorld(ctx, myWorld); 
    renderStack(myStack);
    updateStarsDisplay(myWorld);

    //Link with HTML buttons
    const btnStep = document.getElementById('btn-step');

    if (btnStep) {
        btnStep.addEventListener('click', () => {
            if (stackIsEmpty(myStack) && instructionIndex === 0) {
                myStack = [...myProgram.prog[0].func];
                renderStack(myStack);
                updateStarsDisplay(myWorld);
                return;
            }
            if (!stackIsEmpty(myStack)) {
                const currentInstruction = stackPeek(myStack); // on prend le premier
                myStack = stackPop(myStack);
                const currentCell = myWorld.cells[myWorld.robot.row][myWorld.robot.col];
                try {
                    if (currentInstruction.Name === "CALL") {
                        //On ajoute les instructions de la fct au début de la pile
                        const newInstructions = callFunction(myWorld.robot, myProgram, currentInstruction.x, currentInstruction.c, currentCell);
                        myStack = [...newInstructions, ...myStack];
                    } else {
                        execSimple(myWorld, currentInstruction, currentCell);
                    }
                    renderWorld(ctx, myWorld);  
                    renderStack(myStack);
                    updateStarsDisplay(myWorld);

                    if (countRemainingStars(myWorld) === 0) {
                        setTimeout(() => {
                            alert("Félicitations ! Vous avez récupéré tous les objectifs !");
                        }, 10);

                        myStack = [];
                        renderStack(myStack);
                    }

                } catch(e) {
                    console.error("Robot crashé !");
                }
        }
    });

    const btnExec = document.getElementById('btn-exec');
    if (btnExec) {
        btnExec.addEventListener('click', () => {
            myWorld = Simulate(myPuzzle, myProgram, 12, 16);
            renderWorld(ctx, myWorld);

            myStack = [];
            renderStack(myStack);
        });
    }
}
});

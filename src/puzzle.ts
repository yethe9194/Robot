type Direction = 0 | 1 | 2 | 3 ;

type puzzle = {
    id: number;
    robotCol: number;
    robotRow: number;
    robotDir: Direction;
    title:string;
    about:string;
    subs:Array<number>;
    allowedCommands:number;
    board:string;
} ;

export { puzzle, Direction };

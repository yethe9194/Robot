import { Stack } from './stack';

type functions = {
  func : Stack;
  size : number;
};


type program = {
  prog : Array<functions>;
  size : number;
};

export { functions, program };

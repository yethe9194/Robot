import { functions } from './functions';
import { instructions } from './instructions';

type Stack = instructions[];

// Returns an empty stack
function stackCreateEmpty(): Stack 
{ 
  return []; 
}

// Checks if the stack `s` is empty
function stackIsEmpty(s: Stack): boolean
{ 
  return (Array.isArray(s) && s.length === 0); 
}

// Returns a new stack where the element `i` has been pushed on top of the stack `s`
function stackPush(i: instructions, s: Stack): number 
{
   return s.push(i); 
}

// Returns a new stack where the top of the stack `s` has been popped
// Throws an error if `s` is empty
function stackPop(s: Stack) {
  if (stackIsEmpty(s))
    throw Error("Stack is empty");
  else
    return s.slice(1, s.length);
}

// Returns the element at the top of the stack `s`
// Throws an error if `s` is empty
function stackPeek(s: Stack) {
  if (stackIsEmpty(s))
    throw Error("Stack is empty");
  else
    return s[0];
}

export { Stack, stackIsEmpty, stackPush, stackPop, stackPeek };

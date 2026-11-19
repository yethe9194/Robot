import { ConfigRobot, boardStringToArray,ConfigCell, ConfigBoard , isAccessible } from "../src/world";
import type { World } from "../src/world";







test( 'Convert sapologie to [sap,olo,gie]', () => {
    expect(boardStringToArray("sapologie",3,3)).toEqual(["sap","olo","gie"]);
});

test( 'Convert poisson to [poi,sso,n]', () => {
    expect(boardStringToArray("poisson",3,3)).toEqual(["poi","sso","n"]);
});


test( 'Convert ta to [t,a,]', () => {
    expect(boardStringToArray("ta",3,1)).toEqual(["t","a",""]);
});

test( 'boardsStringToArray test on empty array', () => {
    expect(boardStringToArray("",3,1)).toEqual(["","",""]);
});

test( 'boardsStringToArray test on empty array', () => {
    expect(boardStringToArray("",1,3)).toEqual([""]);
});

test( 'ConfigCell blue with star', () => {
  expect(ConfigCell('B')).toEqual({ color: 'B', hasStar: true });
});

test( 'ConfigCell green no star', () => {
  expect(ConfigCell('g')).toEqual({ color: 'G', hasStar: false });
});

test( 'ConfigCell space is black', () => {
  expect( ConfigCell(' ')).toEqual({ color: 'N', hasStar: false });
});

test( 'ConfigCell invalid throws', () => {
  expect(() => ConfigCell('Z')).toThrow('Incorrect world error');
});

test('parseBoard line length mismatch throws', () => {
  expect(() => ConfigBoard("BB   B", 16, 12)).toThrow('Incorrect world error');
});

test('test configBoard on empty string', () => {
  expect(() => ConfigBoard("", 16, 12)).toThrow('Empty string');
});

test('config board of bRgggGbrR', () => {
  expect(ConfigBoard("bRgggGbrR", 3, 3)).toEqual([
  [ {color:'B', hasStar:false}, {color:'R', hasStar:true},  {color:'G', hasStar:false} ],
  [ {color:'G', hasStar:false}, {color:'G', hasStar:false}, {color:'G', hasStar:true}  ],
  [ {color:'B', hasStar:false}, {color:'R', hasStar:false}, {color:'R', hasStar:true}  ],
]);
});

test('configRobot in position (4,3) who watches into south', () => {
    expect(ConfigRobot(4,3,1)).toEqual({col : 4, row : 3, dir : 1});
});

const simpleWorld: World = {
  cells: [
    [{ color: 'B', hasStar: true }, { color: 'B', hasStar: false }],
    [{ color: 'N', hasStar: false }, { color: 'G', hasStar: false }],
  ],
  robot: { col: 0, row: 0, dir: 0 },
  rows: 2,
  cols: 2,
};

const simpleWorld1: World = {
  cells: [
    [{ color: 'B', hasStar: false }, { color: 'B', hasStar: false }],
    [{ color: 'N', hasStar: false }, { color: 'G', hasStar: false }],
  ],
  robot: { col: 0, row: 0, dir: 0 },
  rows: 2,
  cols: 2,
};

test('isAccessible valid blue cell', () => {
  expect(isAccessible(simpleWorld, 0, 0)).toBe(true);
});

test('isAccessible black cell is false', () => {
  expect(isAccessible(simpleWorld, 1, 0)).toBe(false);
});

test('isAccessible out of bounds is false', () => {
  expect(isAccessible(simpleWorld, 5, 5)).toBe(false);
});





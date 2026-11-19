import { collectAllStars, allStarsCollected  } from '../src/goals';
import type { World } from '../src/world';

const worldWithStar: World = {
  cells: [[{ color: 'B', hasStar: true }]],
  robot: { col: 0, row: 0, dir: 0 },
  rows: 1,
  cols: 1,
};

const worldNoStar: World = {
  cells: [[{ color: 'B', hasStar: false }]],
  robot: { col: 0, row: 0, dir: 0 },
  rows: 1,
  cols: 1,
};



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

test('collectAllStars false when star remains', () => {
  expect(collectAllStars(worldWithStar)).toBe(false);
});

test('collectAllStars true when no stars', () => {
  expect(collectAllStars(worldNoStar)).toBe(true);
});

test('allStarsCollected false when stars remain', () => {
  expect(allStarsCollected(simpleWorld)).toBe(false);
});

test('allStarsCollected false when stars remain', () => {
  expect(allStarsCollected(simpleWorld1)).toBe(true);
});

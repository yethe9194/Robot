import type { World } from "../src/world";

type Goal = (world: World) => boolean;

const collectAllStars: Goal = (world: World): boolean => {
  return allStarsCollected(world);
};
function collectStar(world: World, row: number, col: number): World {
  const newCells = world.cells.map((r, ri) =>
    r.map((cell, ci) =>
      ri === row && ci === col ? { ...cell, hasStar: false } : cell
    )
  );
  return { ...world, cells: newCells };
}

function allStarsCollected(world: World): boolean {
      return world.cells.every(row => row.every(cell => !cell.hasStar));
}

const countRemainingStars = (world: World): number => {
  return world.cells.reduce((total, row) => total + row.filter(cell => cell.hasStar).length, 0);
};

export type { Goal };
export { collectAllStars, collectStar, allStarsCollected, countRemainingStars };   

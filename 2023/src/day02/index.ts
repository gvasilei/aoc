import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const games = input.split(/\r?\n/);


  return games.map((game) => {
    const [gameInfo, gameData] = game.split(":");
    const gameId = gameInfo.split(" ")[1];
    const gameSets = gameData.split(";")

    if (isValidGame(gameSets)) {
      return parseInt(gameId);
    } else {
      return 0;
    }
    
  }).reduce((acc, curr) => acc + curr, 0) 

};

const isValidGame = (gameSets: string[]): boolean => {
  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;

  for (const gameSet of gameSets) {
    const cubes = gameSet.split(",");
    for (const cube of cubes) {
      const [count, color] = cube.trim().split(" ");
      if (color === "red" && parseInt(count) > MAX_RED) {
        return false;
      }
      if (color === "green" && parseInt(count) > MAX_GREEN) {
        return false;
      }
      if (color === "blue" && parseInt(count) > MAX_BLUE) {
        return false;
      }
    }
  }

  return true;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const games = input.split(/\r?\n/);

  return games.map((game) => {
    const [gameInfo, gameData] = game.split(":");
    const gameSets = gameData.split(";")

    return powerOfMinimumSet(gameSets);
    
  }).reduce((acc, curr) => acc + curr, 0) 
};

const powerOfMinimumSet = (gameSets: string[]): number => {
  let MAX_RED = 0;
  let MAX_GREEN = 0;
  let MAX_BLUE = 0;

  for (const gameSet of gameSets) {
    const cubes = gameSet.split(",");
    for (const cube of cubes) {
      const [count, color] = cube.trim().split(" ");
      if (color === "red" && parseInt(count) > MAX_RED) {
        MAX_RED = parseInt(count);
      }
      if (color === "green" && parseInt(count) > MAX_GREEN) {
        MAX_GREEN = parseInt(count);
      }
      if (color === "blue" && parseInt(count) > MAX_BLUE) {
        MAX_BLUE = parseInt(count);
      }
    }
  }

  return MAX_RED * MAX_GREEN * MAX_BLUE;
}

run({
  part1: {
    tests: [
       {
         input: `Game 36: 9 red, 5 blue, 8 green; 7 red, 20 blue; 6 green, 16 blue, 5 red; 12 red, 3 blue, 3 green; 3 green, 6 blue, 11 red; 11 red, 8 blue, 3 green`,
         expected: 0,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
       {
         input: `Game 1: 6 green, 3 blue; 3 red, 1 green; 4 green, 3 red, 5 blue`,
         expected: 6 * 5 * 3,
       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

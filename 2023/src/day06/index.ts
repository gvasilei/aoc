import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Race = {
  time:number,
  record: number
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);
  const raceTimes = [...lines[0].split(":")[1].matchAll(/\d+/g)].map(n => parseInt(n[0]))
  const raceRecords = [...lines[1].split(":")[1].matchAll(/\d+/g)].map(n => parseInt(n[0]))

  const numSolutions: number[] = [];

  for (let i=0; i < raceTimes.length; i++) {
    let solutions = 0;
    for (let j=1; raceTimes[i]-j > 0; j++) {
      console.log(`Race Time: ${raceTimes[i]-j} Race speed: ${j} distance: (${(raceTimes[i]-j) * j}`)
      if ((raceTimes[i]-j) * j > raceRecords[i]) {
        solutions++
      }
    }

    numSolutions.push(solutions)
  }

  console.log(raceTimes, raceRecords)
  console.log(numSolutions)
  return numSolutions.reduce((a, b) => a * b, 1)

};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

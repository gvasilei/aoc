import run from "aocrunner";

type Instruction = "L" | "R";
type NodeKey = string;
type Nodes = Map<NodeKey, [NodeKey, NodeKey]>;

const parseInput = (rawInput: string): [Instruction[], Nodes]=> {
  const lines = rawInput.split(/\r?\n/);
  const instructions = lines[0].split("") as Instruction[];
  const nodes: Nodes = new Map();
  lines.slice(2).forEach((line, idx) => {
    const matches = line.match(/[A-Z]{3}/g);
    if (matches === null) {
      throw new Error("Invalid input");
    }

    nodes.set(matches[0], [matches[1], matches[2]]);
  })
  
  return [instructions, nodes];
}

const gcd = (a: number, b: number) => {
  while (b > 0) [a, b] = [b, a % b];
  return a;
};
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const part1 = (rawInput: string) => {
  const [instructions, nodes] = parseInput(rawInput);

  let numSteps = 0;
  let currNode = "AAA";
  let i = 0;
  while (currNode !== "ZZZ") {
    numSteps++;
    const instruction = instructions[i];
    

    if (instruction === "L") {
      currNode = nodes.get(currNode)![0];
    } else {
      currNode = nodes.get(currNode)![1];
    }
    i = i + 1 < instructions.length ? i + 1 : 0;
  }

  return numSteps
  
};

const part2 = (rawInput: string) => {
  const [instructions, nodes] = parseInput(rawInput);
  const startNodes = [...nodes.keys()].filter((key) => key[2] === "A");

  return startNodes.map((startNode) => {
    let numSteps = 0;
    let currNode = startNode;
    let i = 0;

    while (currNode[2] !== "Z") {
      numSteps++;
      const instruction = instructions[i];

      if (instruction === "L") {
        currNode = nodes.get(currNode)![0];
      } else {
        currNode = nodes.get(currNode)![1];
      }
      i = i + 1 < instructions.length ? i + 1 : 0;
    }

    return numSteps;
  }).reduce(lcm);

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

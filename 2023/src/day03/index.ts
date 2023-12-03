import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  type Match = { text: string, start: number, end: number, line: number }
  const partNumbers = Array<Match>();
  const specialChars = Array<Match>();

  lines.forEach((line, idx) => {
    const numbers = [...line.matchAll(/\d+/g)]
    numbers.forEach(match => {
      if (match.index !== undefined) {
        partNumbers.push({ text: match[0], start: match.index, end: match.index+match[0].length, line: idx })
      }
    })

    const specialCharsMatches = [...line.matchAll(/[^.\d]/g)]
    specialCharsMatches?.forEach(char => {
      if (char.index !== undefined) {
        specialChars.push({ text: char[0], start: char.index, end: char.index+char[0].length, line: idx })
      }
    })
  })

  const isAdjacent = (a: Match, b: Match) => {
    return a.line - 1 <= b.line && a.line + 1 >= b.line && a.start <= b.end && a.end >= b.start;
  }

  return partNumbers.filter(partNumber => {
    return specialChars.some(specialChar => {
      return isAdjacent(partNumber, specialChar)
    })
  }).reduce((a, b) => a + parseInt(b.text), 0)
  
} 

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  type Match = { text: string, start: number, end: number, line: number }
  const partNumbers = Array<Match>();
  const specialChars = Array<Match>();

  lines.forEach((line, idx) => {
    const numbers = [...line.matchAll(/\d+/g)]
    numbers.forEach(match => {
      if (match.index !== undefined) {
        partNumbers.push({ text: match[0], start: match.index, end: match.index+match[0].length, line: idx })
      }
    })

    const specialCharsMatches = [...line.matchAll(/[^.\d]/g)]
    specialCharsMatches?.forEach(char => {
      if (char.index !== undefined) {
        specialChars.push({ text: char[0], start: char.index, end: char.index+char[0].length, line: idx })
      }
    })
  })

  const isAdjacent = (a: Match, b: Match) => {
    return a.line - 1 <= b.line && a.line + 1 >= b.line && a.start <= b.end && a.end >= b.start;
  }

  return specialChars.map(specialChar => partNumbers.filter(partNumber => isAdjacent(partNumber, specialChar)))
    .filter(matches => matches.length === 2)
    .reduce((a, b) => a + parseInt(b[0].text) * parseInt(b[1].text), 0)
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

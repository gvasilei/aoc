import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  return lines.map(line => {
    const lineData = line.split(": ")[1];
    const [winningNumbersData, numbersData] = lineData.split(" | ");
    const winningNumbers = winningNumbersData.trim().split("  ").flatMap(n => n.split(" "));
    const numbers = numbersData.trim().split("  ").flatMap(n => n.split(" "));
    const foundNumbers = winningNumbers.filter(winningNumber => numbers.includes(winningNumber));

    if (foundNumbers.length === 0) {
      return 0;
    } else {
      return Math.pow(2, foundNumbers.length - 1);
    }
  }).reduce((a, b) => a + b, 0)

};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  type Card = { id: number, matches: number}

  const cardsMap = new Map<number, Card>()
  const cards = lines.map(line => {
    const [cardNumData, lineData] = line.split(": ");
    const [winningNumbersData, numbersData] = lineData.split(" | ");
    const winningNumbers = winningNumbersData.trim().split("  ").flatMap(n => n.split(" "));
    const numbers = numbersData.trim().split("  ").flatMap(n => n.split(" "));
    const foundNumbers = winningNumbers.filter(winningNumber => numbers.includes(winningNumber));
    const card: Card = {
      id: parseInt(cardNumData.match(/\d+/g)![0]),
      matches: foundNumbers.length,
    }

    cardsMap.set(card.id, card)
    return card
  })

  let count = cards.length;
  while (cards.length > 0) {
    const card = cards.pop()!
    for (let i = 0; i < card.matches; i++) {
        count++
        const newCard = cardsMap.get(card.id + i + 1)!
        cards.push(newCard)
    }
  }


  return count;
};

run({
  part1: {
    tests: [
      {
         
        //input: `Card   1: 79  1  6  9 88 95 84 69 83 97 | 42 95  1  6 71 69 61 99 84 12 32 96  9 82 88 97 53 24 28 65 83 38  8 68 79`,
        input: `Card 215:  5 39 47 66 90 45 34 77 80  6 |  7  2 26 76 36  9 88 14 53 93 84 33 50  5 47 69 63 71 66 12 62 39 90  1 51`,        
        expected: Math.pow(2,4),
      },
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

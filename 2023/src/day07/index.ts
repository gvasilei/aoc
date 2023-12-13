import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;
type Rank = {[keyof: string] : number }
const rank: Rank = {
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  "T": 9,
  "J": 10,
  "Q": 11,
  "K": 12,
  "A": 13
}

const rank2: Rank = {
  "J": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "T": 10,
  "Q": 11,
  "K": 12,
  "A": 13
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  /* A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2

  Five of a kind, where all five cards have the same label: AAAAA
  Four of a kind, where four cards have the same label and one card has a different label: AA8AA
  Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
  Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
  Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
  One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
  High card, where all cards' labels are distinct: 23456

  */

  const winnings = lines.map(line => {
    const [hand, bid] = line.split(" ");

    const rankData = new Map<string, number>()
    let singleCardRank = 0
  
    hand.split("").forEach((card, idx) => {
      const data = rankData.get(card)
      if (data !== undefined) {
        rankData.set(card, data+1);
      } else {
        rankData.set(card, 1);
      }
  
      singleCardRank += Math.pow(16, 5-idx) * rank[card]
    })

    let handRank = 0
    for (const key of rankData.keys()) {
      const num = rankData.get(key)!
      handRank += Math.pow(16, num +6 -1)
    }

    return {rank: handRank+singleCardRank, bid: bid, hand: hand}
  }).sort((a, b) => a.rank - b.rank)
    .reduce((winnings, hand, idx) => winnings += parseInt(hand.bid) * (idx+1) , 0)

  return winnings
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  const winnings = lines.map(line => {
    const [hand, bid] = line.split(" ");

    const rankData = new Map<string, number>()
    let singleCardRank = 0
  
    hand.split("").forEach((card, idx) => {
      const data = rankData.get(card)
      if (data !== undefined) {
        rankData.set(card, data+1);
      } else {
        rankData.set(card, 1);
      }
  
      singleCardRank += Math.pow(16, 5-idx) * rank2[card];
    })

    let handRank = 0;
    // If there are jokers, add them to the highest card, unless we have a five of a kind of Jokers
    let entries = Array.from(rankData.entries()).sort((a, b) => b[1] - a[1]);
    const jokers = entries.find(([key, value]) => key === "J") || ["J", 0];
    if (jokers[1] < 5) {
      entries = entries.filter(([key, value]) => key !== "J");
      entries[0][1] += jokers[1];
    }
    
    entries.forEach(([key, value]) => {
      handRank += Math.pow(16, value +6 -1)
    })

    return {rank: handRank+singleCardRank, bid: bid, hand: hand}
  }).sort((a, b) => a.rank - b.rank)
    .reduce((winnings, hand, idx) => winnings += parseInt(hand.bid) * (idx+1) , 0)

  return winnings
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

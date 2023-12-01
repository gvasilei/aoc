import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  const sum = lines.map((line) => {
    const digits = line.match(/\d/g)
    if (digits) {
      const first = digits[0]
      const last = digits[digits.length - 1]
      return parseInt(first + last)
    } else {
      return 0
    }
  }).reduce((a, b) => a + b, 0)

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split(/\r?\n/);

  type NumberGlyph = {
    glyph: string,
    number: string
  }

  type NumberGlyphPos = NumberGlyph & {
    pos: number
  }

  const numberGlyphs: NumberGlyph[] = [
    {glyph: "zero", number: "0"},
    {glyph: "one", number: "1"},
    {glyph: "two", number: "2"},
    {glyph: "three", number: "3"},
    {glyph: "four", number: "4"},
    {glyph: "five", number: "5"},
    {glyph: "six", number: "6"},
    {glyph: "seven", number: "7"},
    {glyph: "eight", number: "8"},
    {glyph: "nine", number: "9"},
    {glyph: "0", number: "0"},
    {glyph: "1", number: "1"},
    {glyph: "2", number: "2"},
    {glyph: "3", number: "3"},
    {glyph: "4", number: "4"},
    {glyph: "5", number: "5"},
    {glyph: "6", number: "6"},
    {glyph: "7", number: "7"},
    {glyph: "8", number: "8"},
    {glyph: "9", number: "9"},
  ];
  
  const sum = lines.map((line) => {

    let numberGlyphPos: NumberGlyphPos[] = []
  
    numberGlyphs.forEach((numberGlyph) => {
      if (line.includes(numberGlyph.glyph)) {
        [...line.matchAll(new RegExp(numberGlyph.glyph, "gi"))].forEach((match) => {
          if (match?.index !== undefined) {
            numberGlyphPos.push({
              ...numberGlyph,
              pos: match.index
            })
          }
        });
      }
    })


    numberGlyphPos.sort((a, b) => a.pos - b.pos)
    const first = numberGlyphPos[0]
    const last = numberGlyphPos[numberGlyphPos.length - 1]

    return parseInt(first.number + last.number)
  }).reduce((a, b) => a + b, 0)

  return sum;
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

import run from "aocrunner";

type ConversionInfo = { from: number, to: number, range: number}
type Almanac = {
  seeds: number[],
  seedToSoil: ConversionInfo[],
  soilToFertilizer: ConversionInfo[],
  fertilizerToWater: ConversionInfo[],
  waterToLight: ConversionInfo[],
  lightToTemperature: ConversionInfo[],
  temperatureToHumidity: ConversionInfo[],
  humidityToLocation: ConversionInfo[]
}

const lineToConversionInfo = (line: string): ConversionInfo => {
  const elems = line.split(" ");
  return {
    from: parseInt(elems[1]), to: parseInt(elems[0]), range: parseInt(elems[2])
  }
}

const parseInput = (rawInput: string): Almanac => {
  const chunks = rawInput.split(/\n\n/);

  return {
    seeds: [...chunks[0].matchAll(/\d+/g)].map(match => parseInt(match[0])),
    seedToSoil: chunks[1].split(/\r?\n/).slice(1).map(lineToConversionInfo),
    soilToFertilizer: chunks[2].split(/\r?\n/).slice(1).map(lineToConversionInfo),
    fertilizerToWater: chunks[3].split(/\r?\n/).slice(1).map(lineToConversionInfo),
    waterToLight: chunks[4].split(/\r?\n/).slice(1).map(lineToConversionInfo),
    lightToTemperature: chunks[5].split(/\r?\n/).slice(1).map(lineToConversionInfo),
    temperatureToHumidity: chunks[6].split(/\r?\n/).slice(1).map(lineToConversionInfo),
    humidityToLocation: chunks[7].split(/\r?\n/).slice(1).map(lineToConversionInfo)
  }
}

const toDestination = (sourceId: number, conversions: ConversionInfo[]): number => {
  const res = conversions.find(conversionInfo => sourceId >= conversionInfo.from && sourceId <= conversionInfo.from + conversionInfo.range)
  if (res === undefined) {
    return sourceId
  } else {
    const diff = sourceId - res.from
    return res.to + diff
  }
}

const part1 = (rawInput: string) => {
  const almanac = parseInput(rawInput);

  //console.log(almanac)
  const locations = almanac.seeds.map(seed => {
    const soilId = toDestination(seed, almanac.seedToSoil);
    const fertilizerId = toDestination(soilId, almanac.soilToFertilizer);
    const waterId = toDestination(fertilizerId, almanac.fertilizerToWater);
    const lightId = toDestination(waterId, almanac.waterToLight);
    const temperatureId = toDestination(lightId, almanac.lightToTemperature);
    const humidityId = toDestination(temperatureId, almanac.temperatureToHumidity);
    const locationId = toDestination(humidityId, almanac.humidityToLocation);

    return locationId
  }).sort((a, b) => a - b)

  console.log(locations)


  return locations[0]
};

const part2 = (rawInput: string) => {
  const almanac = parseInput(rawInput);

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

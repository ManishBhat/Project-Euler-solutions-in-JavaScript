const discreteRV = {}

discreteRV.probDist = {}
discreteRV.createRV = function (n) {
  const p = 1 / n
  for (let i = 1; i <= n; ++i) {
    this.probDist[i] = p
  }
}
discreteRV.addRV = function (RV1, RV2) {
  const RV3 = Object.create(discreteRV)
  RV3.probDist = {}
  const probDist1 = RV1.probDist
  const probDist2 = RV2.probDist
  for (const x1 in probDist1) {
    for (const x2 in probDist2) {
      const x3 = +x1 + +x2 // +x1 converts x1 that is stored as a string to a number.
      if (typeof RV3.probDist[x3] === 'undefined') RV3.probDist[x3] = 0
      RV3.probDist[x3] += probDist1[x1] * probDist2[x2]
    }
  }
  return RV3
}

discreteRV.multiplyRV = function (c, RV) {
  const RV2 = Object.create(discreteRV)
  RV2.probDist = {}
  for (const x in RV.probDist) {
    RV2.probDist[c * +x] = RV.probDist[x]
  }
  return RV2
}

function main () {
  const fourSidedDice = Object.create(discreteRV)
  const sixSidedDice = Object.create(discreteRV)
  let pyramidalPete = Object.create(discreteRV)
  let cubicColin = Object.create(discreteRV)

  fourSidedDice.probDist = {}
  sixSidedDice.probDist = {}
  pyramidalPete.probDist = {}
  cubicColin.probDist = {}

  fourSidedDice.createRV(4)
  sixSidedDice.createRV(6)
  pyramidalPete.createRV(4)
  cubicColin.createRV(6)

  for (let i = 1; i < 9; ++i) {
    pyramidalPete = discreteRV.addRV(pyramidalPete, fourSidedDice)
  }

  for (let i = 1; i < 6; ++i) {
    cubicColin = discreteRV.addRV(cubicColin, sixSidedDice)
  }

  const compareRV = discreteRV.addRV(pyramidalPete, discreteRV.multiplyRV(-1, cubicColin))
  let result = 0

  for (const x in compareRV.probDist) {
    if (+x > 0) {
      result += compareRV.probDist[x]
    }
  }

  console.log(result.toFixed(7))
}

console.time('main')
main() // The function you're measuring time for 
console.timeEnd('main')
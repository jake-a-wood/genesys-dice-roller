let testDicePool = new DicePool()

testDicePool.setDice([
    BoostDie,
    SetbackDie,
    AbilityDie,
    DifficultyDie,
    ProficiencyDie,
    ChallengeDie,
])

console.log(testDicePool.roll())
console.log(testDicePool.roll())
console.log(testDicePool.roll())
console.log(testDicePool.roll())

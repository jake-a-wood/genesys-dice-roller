// enum
const Outcome = {
    Blank: 1,
    Success: 2,
    Advantage: 4,
    Triumph: 8,
    Failure: 16,
    Threat: 32,
    Despair: 64,
}

// class
function Die (faceArray = []) {
    // Properties
    this.faceArray = []
    
    // Construction
    this.faceArray = faceArray
    
    // Methods
    this.roll = function () {
        return this.faceArray[Math.floor(Math.random(1, this.faceArray.length) * this.faceArray.length)]
    }
}

const BoostDie = new Die([
    [Outcome.Blank],
    [Outcome.Blank],
    [Outcome.Success],
    [Outcome.Success, Outcome.Advantage],
    [Outcome.Advantage, Outcome.Advantage],
    [Outcome.Advantage],
])

const SetbackDie = new Die([
    [Outcome.Blank],
    [Outcome.Blank],
    [Outcome.Failure],
    [Outcome.Failure],
    [Outcome.Threat],
    [Outcome.Threat],
])

const AbilityDie = new Die([
    [Outcome.Blank],
    [Outcome.Success],
    [Outcome.Success],
    [Outcome.Success, Outcome.Success],
    [Outcome.Advantage],
    [Outcome.Advantage],
    [Outcome.Success, Outcome.Advantage],
    [Outcome.Advantage, Outcome.Advantage],
])

const DifficultyDie = new Die([
    [Outcome.Blank],
    [Outcome.Failure],
    [Outcome.Failure, Outcome.Failure],
    [Outcome.Threat],
    [Outcome.Threat],
    [Outcome.Threat],
    [Outcome.Threat, Outcome.Threat],
    [Outcome.Failure, Outcome.Threat],
])

const ProficiencyDie = new Die([
    [Outcome.Blank],
    [Outcome.Success],
    [Outcome.Success],
    [Outcome.Success, Outcome.Success],
    [Outcome.Success, Outcome.Success],
    [Outcome.Advantage],
    [Outcome.Success, Outcome.Advantage],
    [Outcome.Success, Outcome.Advantage],
    [Outcome.Success, Outcome.Advantage],
    [Outcome.Advantage, Outcome.Advantage],
    [Outcome.Advantage, Outcome.Advantage],
    [Outcome.Triumph],
])

const ChallengeDie = new Die([
    [Outcome.Blank],
    [Outcome.Failure],
    [Outcome.Failure],
    [Outcome.Failure, Outcome.Failure],
    [Outcome.Failure, Outcome.Failure],
    [Outcome.Threat],
    [Outcome.Failure, Outcome.Threat],
    [Outcome.Failure, Outcome.Threat],
    [Outcome.Failure, Outcome.Threat],
    [Outcome.Threat, Outcome.Threat],
    [Outcome.Threat, Outcome.Threat],
    [Outcome.Despair],
])

// class
function DicePool () {
    // Properties
    this.dice = []
    
    // Construction
    
    // Methods
    this.setDice = function (dice = []) {
        this.dice = dice
    }
    this.roll = function () {
        let rolls = []
        for (let i = 0; i < this.dice.length; i++) {
            rolls.push(this.dice[i].roll())
        }
        let output = this.resolveRolls(rolls)
        return {
            rolls: output,
            humanReadableRolls: this.humanReadableOutput(output)
        }
    }
    this.resolveRolls = function (rolls) {
        let successes = 0
        let failures = 0
        let advantages = 0
        let threats = 0 
        let triumphs = 0
        let despairs = 0
        
        for (let i0 = 0; i0 < rolls.length; i0++) {
            const outcomes = rolls[i0]
            for (let i1 = 0; i1 < outcomes.length; i1++) {
                const outcome = outcomes[i1]
                switch (outcome) {
                    case Outcome.Success:
                    successes++
                    break
                    case Outcome.Failure:
                    failures++
                    break
                    case Outcome.Advantage:
                    advantages++
                    break
                    case Outcome.Threat:
                    threats++
                    break
                    case Outcome.Triumph:
                    triumphs++
                    break
                    case Outcome.Despair:
                    despairs++
                    break
                    default:
                    // Blank outcome does nothing
                    break
                }
            }
        }
        
        // Success / Failure
        if (successes == failures) {
            successes =  0
            failures = 0
        }
        else if (successes > failures) {
            successes = successes - failures
            failures = 0
        }
        else {
            failures = failures - successes
            successes = 0
        }
        // Advantage / Threat
        if (advantages == threats) {
            advantages =  0
            threats = 0
        }
        else if (advantages > threats) {
            advantages = advantages - threats
            threats = 0
        }
        else {
            threats = threats - advantages
            advantages = 0
        }
        // Triumph / Despair
        if (triumphs == despairs) {
            triumphs =  0
            despairs = 0
        }
        else if (triumphs > despairs) {
            triumphs = triumphs - despairs
            despairs = 0
        }
        else {
            despairs = despairs - triumphs
            triumphs = 0
        }
        
        return {
            [Outcome.Success]: successes,
            [Outcome.Failure]: failures,
            [Outcome.Advantage]: advantages,
            [Outcome.Threat]: threats,
            [Outcome.Triumph]: triumphs,
            [Outcome.Despair]: despairs
        }
    }
    this.humanReadableOutput = function (resolvedRoll) {
        return {
            "Success": resolvedRoll[Outcome.Success],
            "Failure": resolvedRoll[Outcome.Failure],
            "Advantage": resolvedRoll[Outcome.Advantage],
            "Threat": resolvedRoll[Outcome.Threat],
            "Triumph": resolvedRoll[Outcome.Triumph],
            "Despair": resolvedRoll[Outcome.Despair],
        }
    }
}

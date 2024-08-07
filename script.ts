const availableColors: Array<string> = ["blue", "red", "yellow", "green"];
let codeToGuessEtape1: Array<string> = ["blue", "red"];
let proposition: Array<string> = ["blue", "red"];

function colorRules(proposition: Array<string>, availableColors: Array<string>): boolean {
    for (let ele of proposition) {
        if (!availableColors.includes(ele)) return false;
    }
    return true;
}
console.log("colorRules console log : ", colorRules(proposition, availableColors));

function win(solution: Array<string>, proposition: Array<string>): boolean {
    for (let i = 0; i < solution.length; i++) {
        if (!(solution[i] == proposition[i])) return false;
    }
    return true;
}

console.log("win console log : ", win(codeToGuessEtape1, proposition));

function keepGoing(a, b) {
    let w = win(a, b);
    if (!w) return false;
}

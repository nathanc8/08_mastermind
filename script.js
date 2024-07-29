var availableColors = ["blue", "red", "yellow", "green"];
var codeToGuessEtape1 = ["blue", "red"];
var proposition = ["blue", "red"];
function colorRules(proposition, availableColors) {
    for (var _i = 0, proposition_1 = proposition; _i < proposition_1.length; _i++) {
        var ele = proposition_1[_i];
        if (!availableColors.includes(ele))
            return false;
    }
    return true;
}
console.log("colorRules console log : ", colorRules(proposition, availableColors));
function win(solution, proposition) {
    for (var i = 0; i < solution.length; i++) {
        if (!(solution[i] == proposition[i]))
            return false;
    }
    return true;
}
console.log("win console log : ", win(codeToGuessEtape1, proposition));
function keepGoing() { }

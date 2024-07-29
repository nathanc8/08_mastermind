const availableColors: Array<string> = ["blue", "red", "yellow", "green"];
const codeToGuessEtape1: Array<string> = ["blue", "red"];
let proposition: Array<string> = ["yellow", "green"];

function colorRules(arr1: Array<string>, arr2: Array<string>): boolean {
    for (let ele of arr1) {
        if (!arr2.includes(ele)) return false;
    }
    return true;
}

console.log(colorRules(codeToGuessEtape1, availableColors));

function win() {}

function keepGoing() {}

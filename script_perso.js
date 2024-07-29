var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//Tableau des couleurs disponibles
var availableColors = ["blue", "red", "yellow", "green", "orange", "purle", "white", "black"];
var availableColorsImg = ["🔵", "🔴", "🟡", "🟢", "🟠", "🟣", "⚪", "⚫"];
//Tableaux nous permettant de stocker le code à deviner, et les tentative
var codeToGuess = [];
var guessingCode = [];
//compteur de nombre de tentative, ne doit pas excéder 12
var count = 0;
//fonction qui génère le code que le joueur va devoir deviner
function generateSecretCode(array) {
    for (var i = 0; i < 4; i++) {
        var randomColor = Math.floor(Math.random() * array.length);
        console.log("randomColor is :", randomColor, array[randomColor]);
        codeToGuess.push(array[randomColor]);
    }
    console.log(codeToGuess);
    return codeToGuess;
}
generateSecretCode(availableColors);
//Donne les couleurs disponibles aux selects de façon dynamique. A voir s'il est possible de le faire en créant également les selects de façon dynamique ?
function initializeColorsLists(arr1, arr2) {
    for (var i = 1; i < 5; i++) {
        var colorSelector = document.getElementById("color".concat(i));
        for (var j = 0; j < arr1.length; j++) {
            var opt = document.createElement("option");
            opt.value = arr1[j];
            opt.innerHTML = arr1[j] + arr2[j];
            colorSelector.appendChild(opt);
        }
    }
}
initializeColorsLists(availableColors, availableColorsImg);
//Compile es différentes couleurs sélectionnées par l'utilisateur et les injecte dans un tableau qui sera utilisé pour les comparaisons
function compileCode() {
    for (var i = 1; i < 5; i++) {
        var colorSelector = document.getElementById("color".concat(i));
        console.log(colorSelector.value);
        guessingCode.push(colorSelector.value);
    }
    console.log(guessingCode);
}
//Compare les codes, en indiquant le nombre de couleurs correctes bien placées et le nombre de couleurs correctes, mais mal placées
function compareCodes(code1, code2) {
    var perfectColors = 0;
    var correctColors = 0;
    //création de copie des tableaux qu'on va pouvoir manipuler.
    var code1copy = __spreadArray([], code1, true);
    var code2copy = __spreadArray([], code2, true);
    //Première boucle qui permet de déterminer les couleurs qui matchent parfaitement. Les couleurs correctes et bien placées sont ensuite retirées des deux tableaux.
    for (var i = 0; i < code1.length; i++) {
        if (code1[i] == code2[i]) {
            perfectColors += 1;
            code1copy[i] = null;
            code2copy[i] = null;
        }
    }
    //Deuxième boule, qui permet de déterminer les couleurs correctes, mais mal placées. On itère sur les copies des tableaux, pour ne pas itérer sur les couleurs parfaites.
    //L'itération est faisabe seulement si on a un élément non null.
    for (var i = 0; i < code1.length; i++) {
        if (code1copy[i] !== null) {
            var index = code2copy.indexOf(code1copy[i]);
            if (index !== -1) {
                correctColors += 1;
                code2copy[index] = null;
            }
        }
    }
    console.log("perfectsColors is : ", perfectColors);
    console.log("correctsColors is : ", correctColors);
    //Mise à jour du nombre de couleurs correctes / parfaites et affichage
    function displayCorrespondance() {
        var perfCol = document.getElementById("perfCol");
        if (perfCol)
            perfCol.innerText = "Vous avez ".concat(perfectColors, " couleur.s correcte.s et bien plac\u00E9e.s");
        var corCol = document.getElementById("corCol");
        if (corCol)
            corCol.innerText = "Vous avez ".concat(correctColors, " couleur.s correcte.s et mal plac\u00E9e.s");
    }
    displayCorrespondance();
}
//Fonction lancée au clic sur le bouton, qui agence l'appel des autres fonctions
function areYouTheMasterMind() {
    guessingCode = [];
    compileCode();
    compareCodes(codeToGuess, guessingCode);
    count += 1;
}

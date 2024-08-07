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
var colorsCorrespondance = {};
//Création d'un objet pour mettre en correspondance les couleurs en caractères avec leurs émojis
function makeCorrespondance() {
    for (var i = 0; i < availableColors.length; i++) {
        colorsCorrespondance[availableColors[i]] = availableColorsImg[i];
    }
    console.log("object is : ", colorsCorrespondance);
    return colorsCorrespondance;
}
makeCorrespondance();
//Initialisation des variables par défaut utilisées dans le jeu.
//Tableaux stockant les codes à deviner, sous forme de string, soit en lettres, soit en emojis pour l'accessibilité
var codeToGuess = [];
var codeToGuessImg = [];
var guessingCode = [];
var guessingCodeImg = [];
//Nombre de couleurs correctes au bon emplacement, et de couleurs correctes au mauvais emplacement
var perfectColors = 0;
var correctColors = 0;
//compteur de nombre de tentative, ne doit pas excéder 12
var count = 0;
//fonction qui génère le code que le joueur va devoir deviner
function generateSecretCode(arr1, arr2) {
    for (var i = 0; i < 4; i++) {
        var randomColor = Math.floor(Math.random() * arr1.length);
        console.log("randomColor is :", randomColor, arr1[randomColor]);
        codeToGuess.push(arr1[randomColor]);
        codeToGuessImg.push(arr2[randomColor]);
    }
    console.log("codeToGuess is : ", codeToGuess);
    console.log("codeToGuessImg is : ", codeToGuessImg);
    var codes = [codeToGuess, codeToGuessImg];
    return codes;
}
generateSecretCode(availableColors, availableColorsImg);
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
//Compile les différentes couleurs sélectionnées par l'utilisateur et les injecte dans un tableau qui sera utilisé pour les comparaisons
function compileCode() {
    var colorToCompile;
    for (var i = 1; i <= 4; i++) {
        var colorSelector = document.getElementById("color".concat(i));
        //console.log(colorSelector.value);
        colorToCompile = colorSelector.value;
        colorToCompile = colorToCompile.split("");
        //console.log(colorToCompile);
        guessingCode.push(colorSelector.value);
    }
    for (var _i = 0, guessingCode_1 = guessingCode; _i < guessingCode_1.length; _i++) {
        var ele = guessingCode_1[_i];
        guessingCodeImg.push(colorsCorrespondance[ele]);
    }
    console.log("guessingCode is ", guessingCode);
    console.log("guessingCodeImg is : ", guessingCodeImg);
}
//Compare les codes, en indiquant le nombre de couleurs correctes bien placées et le nombre de couleurs correctes, mais mal placées
function compareCodes(code1, code2) {
    perfectColors = 0;
    correctColors = 0;
    //création de copie des tableaux qu'on va pouvoir manipuler.
    var code1Copy = __spreadArray([], code1, true);
    var code2Copy = __spreadArray([], code2, true);
    //Première boucle qui permet de déterminer les couleurs qui matchent parfaitement. Les couleurs correctes et bien placées sont ensuite retirées des deux tableaux.
    for (var i = 0; i < code1.length; i++) {
        if (code1[i] == code2[i]) {
            perfectColors += 1;
            code1Copy[i] = null;
            code2Copy[i] = null;
        }
    }
    //Deuxième boucle, qui permet de déterminer les couleurs correctes, mais mal placées. On itère sur les copies des tableaux, pour ne pas itérer sur les couleurs parfaites.
    //L'itération est faisable seulement si on a un élément non null.
    for (var i = 0; i < code1.length; i++) {
        if (code1Copy[i] !== null) {
            var index = code2Copy.indexOf(code1Copy[i]);
            if (index !== -1) {
                correctColors += 1;
                code2Copy[index] = null;
            }
        }
    }
    console.log("perfectsColors is : ", perfectColors);
    console.log("correctsColors is : ", correctColors);
    //Mise à jour du nombre de couleurs correctes / parfaites et affichage
    function displayCorrespondance() {
        var divGuesses = document.getElementById("guesses");
        var playNumber = document.createElement("div");
        playNumber.classList.add("guess");
        var colorsGuessedDisplay = document.createElement("div");
        colorsGuessedDisplay.classList.add("guess");
        if (divGuesses) {
            var guessDisplayed = guessingCodeImg.join("");
            if (playNumber)
                playNumber.innerText = "Guess #".concat(count, "/12 : ").concat(guessDisplayed, " (").concat(guessingCode, ")");
            if (colorsGuessedDisplay)
                colorsGuessedDisplay.innerText = "".concat(perfectColors, " well-placed color(s) and ").concat(correctColors, " other color(s) in the solution");
            divGuesses.appendChild(playNumber);
            divGuesses.appendChild(colorsGuessedDisplay);
        }
    }
    displayCorrespondance();
}
//Reset un select à sa valeur par défaut à l'aide de l'attribut "defaultSelected"
function resetSelect(color) {
    var selectElement = document.getElementById(color);
    for (var i = 0; i < selectElement.options.length; i++) {
        if (!selectElement.options[i].defaultSelected) {
            // Définit la valeur du select à celle de l'option par défaut
            selectElement.selectedIndex = i;
            break; //Permet d'arrêter la boucle dès que la condition est trouvée.
        }
    }
}
//Change la visibilité des boutons
function changeButton() {
    var playButton = document.getElementById("playButton");
    var tryAgainButton = document.getElementById("tryAgainButton");
    if (playButton) {
        if (playButton.className == "visible") {
            playButton.classList.remove("visible");
            playButton.classList.add("invisible");
        }
        else {
            playButton.classList.remove("invisible");
            playButton.classList.add("visible");
        }
    }
    if (tryAgainButton) {
        if (tryAgainButton.className == "visible") {
            tryAgainButton.classList.remove("visible");
            tryAgainButton.classList.add("invisible");
        }
        else {
            tryAgainButton.classList.remove("invisible");
            tryAgainButton.classList.add("visible");
        }
    }
}
//Permet de relancer le jeu, en remettant les valeurs de base à 0, en supprimant l'historique des tentatives, et changeant la visibilité des boutons.
function tryAgain() {
    count = 0;
    codeToGuess = [];
    codeToGuessImg = [];
    generateSecretCode(availableColors, availableColorsImg);
    var divToRemove = document.querySelectorAll(".guess");
    divToRemove.forEach(function (element) {
        var _a;
        (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(element);
    });
    changeButton();
    /* let playButton = document.getElementById("playButton");
    let tryAgainButton = document.getElementById("tryAgainButton");
    if (playButton) {
        playButton.classList.remove("invisible");
        playButton.classList.add("visible");
    }
    if (tryAgainButton) {
        tryAgainButton.classList.remove("visible");
        tryAgainButton.classList.add("invisible");
    } */
    resetSelect("color1");
    resetSelect("color2");
    resetSelect("color3");
    resetSelect("color4");
}
//détermine les conditions de victoire et change l'affichage en fonction de la victoire ou de la défaite
function winOrLose() {
    var divGlobal = document.getElementById("gamePlayer");
    if (count >= 12 && perfectColors != 4) {
        var defeat = document.createElement("div");
        defeat.classList.add("guess");
        defeat.innerText = "You lost, you're not a Mastermind...";
        if (divGlobal)
            divGlobal.appendChild(defeat);
        changeButton();
    }
    else if (perfectColors == 4) {
        var win = document.createElement("div");
        win.classList.add("guess");
        win.innerText = "You won, you're trully a Mastermind !";
        if (divGlobal)
            divGlobal.appendChild(win);
        changeButton();
    }
}
//Fonction lancée au clic sur le bouton, qui agence l'appel des autres fonctions
function areYouTheMasterMind() {
    guessingCode = [];
    guessingCodeImg = [];
    count += 1;
    compileCode();
    compareCodes(codeToGuess, guessingCode);
    winOrLose();
}

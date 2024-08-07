//Tableau des couleurs disponibles
const availableColors: Array<string> = ["blue", "red", "yellow", "green", "orange", "purle", "white", "black"];
const availableColorsImg: Array<string> = ["🔵", "🔴", "🟡", "🟢", "🟠", "🟣", "⚪", "⚫"];
const colorsCorrespondance: object = {};

//Création d'un objet pour mettre en correspondance les couleurs en caractères avec leurs émojis
function makeCorrespondance(): object {
    for (let i = 0; i < availableColors.length; i++) {
        colorsCorrespondance[availableColors[i]] = availableColorsImg[i];
    }
    console.log("object is : ", colorsCorrespondance);
    return colorsCorrespondance;
}
makeCorrespondance();

//Initialisation des variables par défaut utilisées dans le jeu.
//Tableaux stockant les codes à deviner, sous forme de string, soit en lettres, soit en emojis pour l'accessibilité
let codeToGuess: Array<string> = [];
let codeToGuessImg: Array<string> = [];
let guessingCode: Array<string> = [];
let guessingCodeImg: Array<string> = [];
//Nombre de couleurs correctes au bon emplacement, et de couleurs correctes au mauvais emplacement
let perfectColors: number = 0;
let correctColors: number = 0;
//compteur de nombre de tentative, ne doit pas excéder 12
let count: number = 0;

//fonction qui génère le code que le joueur va devoir deviner
function generateSecretCode(arr1: Array<string>, arr2: Array<string>): Array<Array<string>> {
    for (let i = 0; i < 4; i++) {
        const randomColor = Math.floor(Math.random() * arr1.length);
        console.log("randomColor is :", randomColor, arr1[randomColor]);
        codeToGuess.push(arr1[randomColor]);
        codeToGuessImg.push(arr2[randomColor]);
    }
    console.log("codeToGuess is : ", codeToGuess);
    console.log("codeToGuessImg is : ", codeToGuessImg);
    let codes: Array<Array<string>> = [codeToGuess, codeToGuessImg];
    return codes;
}
generateSecretCode(availableColors, availableColorsImg);

//Donne les couleurs disponibles aux selects de façon dynamique. A voir s'il est possible de le faire en créant également les selects de façon dynamique ?
function initializeColorsLists(arr1, arr2) {
    for (let i = 1; i < 5; i++) {
        let colorSelector = document.getElementById(`color${i}`) as HTMLSelectElement;
        for (let j = 0; j < arr1.length; j++) {
            let opt = document.createElement("option");
            opt.value = arr1[j];
            opt.innerHTML = arr1[j] + arr2[j];
            colorSelector.appendChild(opt);
        }
    }
}
initializeColorsLists(availableColors, availableColorsImg);

//Compile les différentes couleurs sélectionnées par l'utilisateur et les injecte dans un tableau qui sera utilisé pour les comparaisons
function compileCode() {
    let colorToCompile: any;
    for (let i = 1; i <= 4; i++) {
        let colorSelector = document.getElementById(`color${i}`) as HTMLSelectElement;
        //console.log(colorSelector.value);
        colorToCompile = colorSelector.value;
        colorToCompile = colorToCompile.split("");
        //console.log(colorToCompile);
        guessingCode.push(colorSelector.value);
    }
    for (let ele of guessingCode) {
        guessingCodeImg.push(colorsCorrespondance[ele]);
    }
    console.log("guessingCode is ", guessingCode);
    console.log("guessingCodeImg is : ", guessingCodeImg);
}

//Compare les codes, en indiquant le nombre de couleurs correctes bien placées et le nombre de couleurs correctes, mais mal placées
function compareCodes(code1: Array<string | null>, code2: Array<string | null>) {
    perfectColors = 0;
    correctColors = 0;
    //création de copie des tableaux qu'on va pouvoir manipuler.
    let code1Copy = [...code1];
    let code2Copy = [...code2];
    //Première boucle qui permet de déterminer les couleurs qui matchent parfaitement. Les couleurs correctes et bien placées sont ensuite retirées des deux tableaux.
    for (let i = 0; i < code1.length; i++) {
        if (code1[i] == code2[i]) {
            perfectColors += 1;
            code1Copy[i] = null;
            code2Copy[i] = null;
        }
    }
    //Deuxième boucle, qui permet de déterminer les couleurs correctes, mais mal placées. On itère sur les copies des tableaux, pour ne pas itérer sur les couleurs parfaites.
    //L'itération est faisable seulement si on a un élément non null.
    for (let i = 0; i < code1.length; i++) {
        if (code1Copy[i] !== null) {
            const index = code2Copy.indexOf(code1Copy[i]);
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
        let divGuesses = document.getElementById("guesses") as HTMLElement;
        let playNumber = document.createElement("div") as HTMLElement;
        playNumber.classList.add("guess");
        let colorsGuessedDisplay = document.createElement("div") as HTMLElement;
        colorsGuessedDisplay.classList.add("guess");
        if (divGuesses) {
            let guessDisplayed: string = guessingCodeImg.join("");
            if (playNumber) playNumber.innerText = `Guess #${count}/12 : ${guessDisplayed} (${guessingCode})`;
            if (colorsGuessedDisplay)
                colorsGuessedDisplay.innerText = `${perfectColors} well-placed color(s) and ${correctColors} other color(s) in the solution`;
            divGuesses.appendChild(playNumber);
            divGuesses.appendChild(colorsGuessedDisplay);
        }
    }
    displayCorrespondance();
}

//Reset un select à sa valeur par défaut à l'aide de l'attribut "defaultSelected"
function resetSelect(color) {
    const selectElement = document.getElementById(color) as HTMLSelectElement;
    for (let i = 0; i < selectElement.options.length; i++) {
        if (!selectElement.options[i].defaultSelected) {
            // Définit la valeur du select à celle de l'option par défaut
            selectElement.selectedIndex = i;
            break; //Permet d'arrêter la boucle dès que la condition est trouvée.
        }
    }
}

//Change la visibilité des boutons
function changeButton() {
    let playButton = document.getElementById("playButton");
    let tryAgainButton = document.getElementById("tryAgainButton");
    if (playButton) {
        if (playButton.className == "visible") {
            playButton.classList.remove("visible");
            playButton.classList.add("invisible");
        } else {
            playButton.classList.remove("invisible");
            playButton.classList.add("visible");
        }
    }
    if (tryAgainButton) {
        if (tryAgainButton.className == "visible") {
            tryAgainButton.classList.remove("visible");
            tryAgainButton.classList.add("invisible");
        } else {
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
    const divToRemove = document.querySelectorAll(".guess");
    divToRemove.forEach((element) => {
        element.parentNode?.removeChild(element);
    });
    changeButton();
    resetSelect("color1");
    resetSelect("color2");
    resetSelect("color3");
    resetSelect("color4");
}

//détermine les conditions de victoire et change l'affichage en fonction de la victoire ou de la défaite
function winOrLose() {
    let divGlobal = document.getElementById("gamePlayer");
    if (count >= 12 && perfectColors != 4) {
        let defeat = document.createElement("div") as HTMLElement;
        defeat.classList.add("guess");
        defeat.innerText = "You lost, you're not a Mastermind...";
        if (divGlobal) divGlobal.appendChild(defeat);
        changeButton();
    } else if (perfectColors == 4) {
        let win = document.createElement("div") as HTMLElement;
        win.classList.add("guess");
        win.innerText = "You won, you're trully a Mastermind !";
        if (divGlobal) divGlobal.appendChild(win);
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

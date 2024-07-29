//Tableau des couleurs disponibles
const availableColors: Array<string> = ["blue", "red", "yellow", "green", "orange", "purle", "white", "black"];
const availableColorsImg: Array<string> = ["🔵", "🔴", "🟡", "🟢", "🟠", "🟣", "⚪", "⚫"];

//Tableaux nous permettant de stocker le code à deviner, et les tentative
let codeToGuess: Array<string> = [];
let guessingCode: Array<string> = [];

//compteur de nombre de tentative, ne doit pas excéder 12
let count: number = 0;

//fonction qui génère le code que le joueur va devoir deviner
function generateSecretCode(array: Array<string>): Array<string> {
    for (let i = 0; i < 4; i++) {
        const randomColor = Math.floor(Math.random() * array.length);
        console.log("randomColor is :", randomColor, array[randomColor]);
        codeToGuess.push(array[randomColor]);
    }
    console.log(codeToGuess);
    return codeToGuess;
}
generateSecretCode(availableColors);

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

//Compile es différentes couleurs sélectionnées par l'utilisateur et les injecte dans un tableau qui sera utilisé pour les comparaisons
function compileCode() {
    for (let i = 1; i <= 4; i++) {
        let colorSelector = document.getElementById(`color${i}`) as HTMLSelectElement;
        console.log(colorSelector.value);
        guessingCode.push(colorSelector.value);
    }
    console.log(guessingCode);
}

//Compare les codes, en indiquant le nombre de couleurs correctes bien placées et le nombre de couleurs correctes, mais mal placées
function compareCodes(code1: Array<string | null>, code2: Array<string | null>) {
    let perfectColors: number = 0;
    let correctColors: number = 0;
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
    //Deuxième boule, qui permet de déterminer les couleurs correctes, mais mal placées. On itère sur les copies des tableaux, pour ne pas itérer sur les couleurs parfaites.
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
        let perfCol = document.getElementById("perfCol") as HTMLElement;
        if (perfCol) perfCol.innerText = `Vous avez ${perfectColors} couleur.s correcte.s et bien placée.s`;
        let corCol = document.getElementById("corCol") as HTMLElement;
        if (corCol) corCol.innerText = `Vous avez ${correctColors} couleur.s correcte.s et mal placée.s`;
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

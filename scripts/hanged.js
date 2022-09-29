/***********************************************************
 * VARIABLES
 ***********************************************************/

let word = [];
let words = [
    "SONRISA",
    "AMISTAD",
    "PERSONA",
    "JUEGO",
    "CODIGO",
    "AMOR"
];
let errors = [];
let intents = 5;

// Selectores de contenido
let rightWords = document.querySelector(".card-rightWords");
let wrongWords = document.querySelector(".card-wrongWords");

// Disparadores de eventos
let btn_help = document.querySelector("#btn-help");
btn_help.onclick = showHelp;
let btn_close = document.querySelector("#close");
btn_close.onclick = closeHelp;
let btn_on = document.querySelector("#btn-on");
btn_on.onclick = startGame;
let btn_add = document.querySelector("#btn-add");
btn_add.onclick = showAddWord;
let btn_reload = document.querySelector("#btn-reload");
btn_reload.onclick = restartGame;
let btn_exit = document.querySelector("#btn-exit");
btn_exit.onclick = exitGame;
let btn_save = document.querySelector("#btn-save");
btn_save.onclick = addWord;
let btn_cancel = document.querySelector("#btn-cancel");
btn_cancel.onclick = cancelAddWord;


/***********************************************************
 * FUNCIONES
 ***********************************************************/

// Función para iniciar el juego
function startGame() {
    showGame();
    showWord();
    window.addEventListener("keypress", guessLetter);
}

// Función para seleccionar una palabra aleatoria
function selectWord() {
    const random = Math.floor(Math.random() * words.length);
    return words[random];
}

// Función para mostrar la palabra aleatoria
function showWord() {
    word = Array.from(selectWord());

    for (let i in word) {
        const h5 = document.createElement("h5");
        h5.classList.add("resp");
        h5.setAttribute("id",`resp-${ i }`);
        rightWords.appendChild(h5);
    }
}

// Función para adivinar una letra de la palabra aleatoria
function guessLetter(event) {
    const validate = new RegExp("[A-zñÑ]","g");
    let letter = event.key.toUpperCase();
    let indexes = [];

    if (validate.test(letter)) {
        if (word.includes(letter)) {
            indexes = indexOfAll(word, letter);
            indexes.forEach(i => {
                const h5 = document.getElementById(`resp-${ i }`);
                h5.textContent = word[i];
            });
        } else {
            intents--;
            drawHangman();
            errors.push(letter);
            const h6 = document.createElement("h6");
            h6.classList.add("int");
            h6.textContent = letter;
            wrongWords.appendChild(h6);
        }
    }

    guessWord();
}

// Función para actualizar el dibujo del ahorcado
function drawHangman() {
    switch (intents) {
        case 4:
            document.getElementById('img-hangman').src="./public/hangman_2.jpg";
            break;
        case 3:
            document.getElementById('img-hangman').src="./public/hangman_3.jpg";
            break;
        case 2:
            document.getElementById('img-hangman').src="./public/hangman_4.jpg";
            break;
        case 1:
            document.getElementById('img-hangman').src="./public/hangman_5.jpg";
            break;
        case 0:
            document.getElementById('img-hangman').src="./public/hangman_6.jpg";
            setTimeout(function(){
                alert(`¡Lo lamento, perdiste! :( \nLa palabra era ${ (word.toString()).replace(/,/g,"") }`);
                restartGame();
            }, 200);
            break;
    }
}

// Función para verificar que se encontro la palabra aleatoria
function guessWord() {
    let test = "";
    const rightWord = document.querySelectorAll("h5");

    rightWord.forEach(e => {
        test += e.textContent;
    });

    if (test == (word.toString()).replace(/,/g,"")) {
        setTimeout(function(){
            alert("¡Felicidades, ganaste! :)");
            restartGame();
        }, 200);
    }
}

// Función para terminar el juego
function endGame() {
    for (let i in word) {
        const h5 = document.getElementById(`resp-${ i }`);
        rightWords.removeChild(h5);
    }

    for (let j in errors) {
        const h6 = document.querySelector(".int");
        wrongWords.removeChild(h6);
    }

    document.getElementById('img-hangman').src="./public/hangman_1.jpg";

    word = [];
    errors = [];
    intents = 5;
}

// Función para reiniciar del juego
function restartGame() {
    endGame();
    startGame();
}

// Función para salir del juego
function exitGame() {
    endGame();
    window.removeEventListener("keydown", guessLetter);
    showHome();
}

// Función para agregar palabras a la lista
function addWord() {
    const text = document.getElementById("text");

    if (text.value !== '') {
        words.push(text.value.toUpperCase());
        startGame();
        text.value = '';
    } else
        alert("Debe ingresar una palabra válida.");
}

// Función para validar las palabras agregadas
function validateWords(word) {
    const validate = new RegExp("[À-ú0-9@|°¬#$%&/='\´`*¿?¡!(){}<>,.:;+^~_-]","g");

    if (validate.test(word.value)) {
        alert("¡Caracter inválido! Por favor, no se admiten palabras con acento o caracteres especiales.");
        (document.getElementById("text")).value = '';
    }
}

// Función para cancelar agregación de palabras
function cancelAddWord() {
    const text = document.getElementById("text");
    text.value = '';
    showHome();
}

// Función para mostrar la sección de juego
function showGame() {
    document.querySelector("#container-home").style.display = "none";
    document.querySelector("#container-game").style.display = "block";
    document.querySelector("#container-addword").style.display = "none";
}

// Función para mostrar la sección de agregar palabra
function showAddWord() {
    document.querySelector("#container-home").style.display = "none";
    document.querySelector("#container-game").style.display = "none";
    document.querySelector("#container-addword").style.display = "block";
}

// Función para mostrar la sección de inicio
function showHome() {
    document.querySelector("#container-home").style.display = "block";
    document.querySelector("#container-game").style.display = "none";
    document.querySelector("#container-addword").style.display = "none";
}

// Función para mostrar las instrucciones
function showHelp() {
    document.querySelector(".section-help").style.display = "block";
    document.querySelector("#back").style.display = "block";
}

// Función para cerrar las instrucciones
function closeHelp() {
    document.querySelector(".section-help").style.display = "none";
    document.querySelector("#back").style.display = "none";
}

// Función auxiliar para obtener el índice de todas las coincidencias
function indexOfAll(array, searchItem) {
    let indexes = [];
    let i = array.indexOf(searchItem);

    while (i !== -1) {
        indexes.push(i);
        i = array.indexOf(searchItem, ++i);
    }

    return indexes;
}

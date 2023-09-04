/* 
    PT1
    L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
    Ogni cella ha un numero progressivo, da 1 a 100.
    Ci saranno quindi 10 caselle per ognuna delle 10 righe.
    Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

    PT2
    Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
    In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
    
    BONUS:
    Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
    difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
    difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
    difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

    TODO: 
    - Colorare di rosso se calpesta la bomba - fatto
    - colorare azzurro se non calpesta la bomba - fatto
    - Definire la fine del gioco e mostrare il punteggio
*/

//Definisco gli elementi di cui ho bisogno
const fieldElement = document.querySelector('.field');
const row = 10;
const column = 10;
const bombNumber = 16;

//Al click del bottone richiamo la funzione genereateField()
document.querySelector('button').addEventListener('click', function () {
    fieldElement.innerHTML = '';
    const bombIndexList = bombGenerator(bombNumber);
    console.log(bombIndexList);
    generateField(fieldElement, row, column, bombIndexList);
});


/**
 * ### generateField
 * > Function that creates a table of squares. If you click a square its background become lightblue.
 * @param {object} elementDOM Element where i am creating the field
 * @param {number} row Field's rows number
 * @param {number} column Field's columns number
 */
function generateField(elementDOM, row, column, bombIndexList) {
    let gameOver = false;
    const resultElement = document.querySelector('.result');
    let punteggio = 0;

    resultElement.innerHTML = '';

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.append(((i * 10) + (j + 1)));

            cellElement.addEventListener('click', function () {

                if (bombIndexList.includes(((i * 10) + (j + 1)))) {
                    if (!gameOver) {
                        this.classList.add('bg_red');
                        gameOver = true;
                        gameOverElement = document.createElement('h1');
                        gameOverElement.append('GAME OVER');
                        resultElement.append(gameOverElement);
                        resultElement.append('Hai totalizzato ' + punteggio + ' punti!');
                        console.log('BOMBA!!');
                    }
                } else {
                    if (!this.classList.contains('bg_lightblue') && !gameOver) {
                        this.classList.add('bg_lightblue');
                        punteggio++;
                        if (punteggio === 96) {
                            gameOver = true;
                        }
                    }
                }
            });

            elementDOM.append(cellElement);
        }
    }
}

/**
 * ###bombGenerator
 * > This function generate a x number of indexes that determine the bombs position.
 * > A number can't be generated more than once.
 * @param {number} nBomb number of bomb generated
 * @returns {number[]} Array of indexes
 */
function bombGenerator(nBomb) {

    const bombIndexList = [];
    let randomNumber;
    let i = 0;


    while (i < nBomb) {
        randomNumber = Math.ceil(Math.random() * 100);
        if (!bombIndexList.includes(randomNumber)) {
            bombIndexList[i] = randomNumber;
            i++;
        }
    }

    return bombIndexList;
}

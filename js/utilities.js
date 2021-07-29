'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/
function getRandomIntegrer(min,max){
    return Math.floor(Math.random() * (max-min+1)+min)

}

function lancerDes(n,f){
    let total = 0;
    for(let i=1; i<=n; i++)
    {total += getRandomIntegrer(1,f)}
    //return getRandomIntegrer(n,n*f) avoir meme resultat mais sans lancer de des
    return total
}

function getRequestInteger(min, max, message){
    let n;
    do
    {
        n = parseInt(window.prompt(message))
    }
    while(isNaN(n) || n < min || n > max)

    return n
}

// let n = getRequestInteger(1, 3, "Veuillez choisir le niveau de difficlté: 1-facile 2-moyen 3-difficile");










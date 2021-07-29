'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
var jeu;
var pvDragonInitial, pvPlayerInitial;


/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

function initialisationJeu() {
    jeu = {}
    jeu.niveau = getRequestInteger(1, 3, "Veuillez choisir le niveau de difficulté: 1-facile 2-moyen 3-difficile");

    switch (jeu.niveau) {
        case 1:
            jeu.pvPlayer = 100 + lancerDes(10, 10)
            jeu.pvDragon = 100 + lancerDes(5, 10)
            break;

        case 2:
            jeu.pvPlayer = 100 + lancerDes(10, 10)
            jeu.pvDragon = 100 + lancerDes(10, 10)
            break;

        case 3:
            jeu.pvPlayer = 100 + lancerDes(7, 10)
            jeu.pvDragon = 100 + lancerDes(10, 10)
    }

    jeu.caractere = getRequestInteger(1, 3, "Veuillez choisir votre caractère: 1-Voleur 2-Chevalier 3-Mage");

    jeu.tour = 1;

}

function attaquantDes()
{
    let attaquant;
    let lancePlayer = lancerDes(10, 6)
    let lanceDragon = lancerDes(10, 6)
   if(jeu.caractere==1)
        {
            lancePlayer = lancePlayer + Math.floor(lancePlayer*lancerDes(1, 6) / 100)
        }
    if(lancePlayer >= lanceDragon){
        attaquant = "player"
    }
    else{
        attaquant = 'dragon'
    }
    return attaquant
}

function calculDommage(attaquant)
{
    let dommage = lancerDes(3, 6)
    if(attaquant = "player")
    {
        switch (jeu.niveau)
        {
            case 1: 
                dommage = dommage + Math.floor(dommage * lancerDes(2, 6) / 100)
                break;

            case 3:
                dommage = dommage - Math.floor(dommage * lancerDes(1, 6) / 100)
            
        }
        if (jeu.caractere)
        {
            dommage = dommage + Math.floor(dommage * lancerDes(1, 10) / 100)
        }
        
    }
    else
    {
        switch (jeu.niveau)
        {
            case 1: 
                dommage = dommage - Math.floor(dommage * lancerDes(2, 6) / 100)
            case 3:
                dommage = dommage + Math.floor(dommage * lancerDes(1, 6) / 100)
            
        }
        if (jeu.caractere)
        {
           dommage = dommage - Math.floor(dommage * lancerDes(1, 10) / 100)
        }
       
    }
    return dommage;
}

function affichage(attaquant,dommage)
{    
    document.write('<h3>Tour n°'+jeu.tour+'</h3>')
   if(attaquant=='player')
   {
        document.write('<figure class="game-round"> <img src="images/knight-winner.png" alt="Chevalier vainqueur">' + 
        '<figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez '+
         dommage + ' points de dommage !</figcaption> </figure>')

   }
   else
   {
       document.write('<figure class="game-round"> <img src="images/dragon-winner.png" alt="Dragon vainqueur">' +
       '<figcaption>Le dragon prend l\'initiative, vous attaque et vous inflige ' +
        dommage + ' points de dommage !</figcaption> </figure>')
   }

    //console.log(jeu);
}

function afficher_etat()
{

    if (jeu.pvDragon > pvDragonInitial *0.3 && jeu.pvPlayer > pvPlayerInitial *0.3)
    {
        document.write('<div class="game-state"> <figure class="game-state_player"> <img src="images/knight.png" alt="Chevalier"> <figcaption><progress max="'+pvPlayerInitial+'" value="'+jeu.pvPlayer+'"></progress>' + 
        jeu.pvPlayer + '</figcaption> </figure>' + 
        '<figure class="game-state_player"> <img src="images/dragon.png" alt="Dragon"> <figcaption><progress max="'+pvDragonInitial+'" value="'+jeu.pvDragon+'"></progress>' 
        + jeu.pvDragon + '</figcaption> </figure> </div>')
    }
    
    else if(jeu.pvDragon <= pvDragonInitial * 0.3 && jeu.pvPlayer > pvPlayerInitial * 0.3)
    {
        document.write('<div class="game-state"> <figure class="game-state_player"> <img src="images/knight.png" alt="Chevalier"> <figcaption><progress max="'+pvPlayerInitial+'" value="'+jeu.pvPlayer+'"></progress>' + 
        jeu.pvPlayer + '</figcaption> </figure>' + 
        '<figure class="game-state_player"> <img src="images/dragon-wounded.png" alt="Dragon"> <figcaption><progress max="'+pvDragonInitial+'" value="'+jeu.pvDragon+'"></progress>' 
        + jeu.pvDragon + '</figcaption> </figure> </div>')
    }
    else if (jeu.pvPlayer <= pvPlayerInitial * 0.3 && jeu.pvDragon > pvDragonInitial * 0.3)
    {
        document.write('<div class="game-state"> <figure class="game-state_player"> <img src="images/knight-wounded.png" alt="Chevalier"><figcaption><progress max="'+pvPlayerInitial+'" value="'+jeu.pvPlayer+'"></progress>' + 
        jeu.pvPlayer + '</figcaption> </figure>' + 
        '<figure class="game-state_player"> <img src="images/dragon.png" alt="Dragon"> <figcaption><progress max="'+pvDragonInitial+'" value="'+jeu.pvDragon+'"></progress>' 
        + jeu.pvDragon + '</figcaption> </figure> </div>')
    }
    else
    {
        document.write('<div class="game-state"> <figure class="game-state_player"> <img src="images/knight-wounded.png" alt="Chevalier"><figcaption><progress max="'+pvPlayerInitial+'" value="'+jeu.pvPlayer+'"></progress>' + 
        jeu.pvPlayer + '</figcaption> </figure>' + 
        '<figure class="game-state_player"> <img src="images/dragon-wounded.png" alt="Dragon"><figcaption><progress max="'+pvDragonInitial+'" value="'+jeu.pvDragon+'"></progress>' 
        + jeu.pvDragon + '</figcaption> </figure> </div>')

    }
/* methode 2
    document.write('<div class="game-state">');
if(jeu.pvPlayer <= pvPlayerInitial * 0.3)
{
document.write('<figure class="game-state_player"> <img src="images/knight-wounded.png" alt="Chevalier"> <figcaption>' + 
jeu.pvPlayer + '</figcaption> </figure>');

}
else
{
    document.write('<figure class="game-state_player"> <img src="images/knight.png" alt="Chevalier"> <figcaption>' + 
    jeu.pvPlayer + '</figcaption> </figure>');
    

}
if(jeu.pvDragon <= pvDragonInitial * 0.3)
else

document.write('</div>');*/


}

function affiche_winner()
{
    if (jeu.pvPlayer <= 0) {
        document.write(' <footer>'+
        '<h3>'+
        'Fin de la partie'+
        '</h3>'+
        '<figure class="game-end"><img src="images/dragon-winner.png" alt="Dragon vainqueur">'+'<figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption></figure></footer>')
    }
    else if (jeu.pvDragon <= 0) {
        document.write(' <footer>'+
        '<h3>'+
        'Fin de la partie'+
        '</h3>'+
        '<figure class="game-end"><img src="images/knight-winner.png" alt="Dragon vainqueur">'+'<figcaption>Vous avez gagné le combat, BRAVO !</figcaption> </figure></footer>')
    }
 
}
function deroulement()
{
    while (jeu.pvPlayer > 0 && jeu.pvDragon > 0) 
    {
        afficher_etat()
        let attackant=attaquantDes()
        let domage=calculDommage(attackant);
        if(attackant=="player")
        {
            jeu.pvDragon-=domage
            
        }
        else
        {
            jeu.pvPlayer-=domage
        }
        affichage(attackant,domage)
        jeu.tour++
    }

}


/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

//////////// déroulement avec des fonctions ////////////
initialisationJeu();
pvDragonInitial = jeu.pvDragon;
pvPlayerInitial = jeu.pvPlayer;
deroulement()

affiche_winner()





//////////// déroulement sans des fonctions /////////////

// let lancePlayer;
// let lanceDragon;
// let dommage

// while (jeu.pvPlayer > 0 && jeu.pvDragon > 0) {

//     lancePlayer = lancerDes(10, 6);
//     lanceDragon = lancerDes(10, 6);
//     dommage = lancerDes(3, 6);

//     if (lancePlayer >= lanceDragon) {

//         if (jeu.niveau == 1) {
//             dommage = dommage + Math.floor(dommage * lancerDes(2, 6) / 100)
//         }
//         else if (jeu.niveau == 3) {
//             dommage = dommage - Math.floor(dommage * lancerDes(1, 6) / 100)
//         }
//         jeu.pvDragon = jeu.pvDragon - dommage
//     }
//     else {
//         if (jeu.niveau == 1) {
//             dommage = dommage - Math.floor(dommage * lancerDes(2, 6) / 100)
//         }
//         else if (jeu.niveau == 3) {
//             dommage = dommage + Math.floor(dommage * lancerDes(1, 6) / 100)
//         }
//         jeu.pvPlayer = jeu.pvPlayer - dommage
//     }

//     jeu.tour++

//     console.log("le tour n°" + jeu.tour + " :")
//     console.log("Player = " + jeu.pvPlayer + " points" + " " + "Dragon = " + jeu.pvDragon + " points")

// }

// if (jeu.pvPlayer <= 0) {
//     console.log("You lost")
// }
// else if (jeu.pvDragon <= 0) {
//     console.log("You win")
// }


/*VUE*/

//récupération des données issues du formulaire, renvoit un objet
let recupereDonnees = function(key, value) {
    let clef = document.getElementById(key).value;
    let valeur = document.getElementById(value).value;
    let donnees = {
        key: clef,
        value: valeur
    };
    return donnees;
}

//récupération de la zone choisie pour afficher le menu, renvoit un noeud
let recupereZoneMenu = function(zone) {
    let menu = document.getElementById(zone);
    return menu;
}

/*CONTROLEUR*/

//préparation de la variable-objet contenant le menu du repas
let repas = {};

//événement au clic sur le bouton
let boutonClick = document.getElementById("bouton");

boutonClick.addEventListener("click", function(e) {

    //empêcher la redirection vers action
    e.preventDefault();

    let momentRepas = recupereDonnees("clefRepas", "valeurClef");

    //si une case vide : message d'erreur
    if (momentRepas['key'] == "" || momentRepas['value'] == "") {
        let zoneMessageErreur = recupereZoneMenu("menu");
        messageErreur(zoneMessageErreur);
    }
    //si l'entrée existe déjà : on fait un tableau
    else if (repas.hasOwnProperty(momentRepas['key'])) {
        let moment = momentRepas['key'];

        let propositionsPlat = ajoutTableau(repas[moment], momentRepas['value']);
        ajoutAuMenu(repas, momentRepas['key'], propositionsPlat);
        let zoneMenu = recupereZoneMenu("menu");
        afficheMenu(zoneMenu);
    }
    //sinon ajout de la nouvelle entrée à l'objet menu
    else {
        ajoutAuMenu(repas, momentRepas['key'], momentRepas['value']);
        let zoneMenu = recupereZoneMenu("menu");
        afficheMenu(zoneMenu);
    }
});



/*MODELE*/

//affichage du menu dans le DOM
let afficheMenu = function(menu) {
    menu.textContent = "";
    let titreRepas = document.createElement("h1");
    titreRepas.textContent = "Voici le menu composé";
    menu.appendChild(titreRepas);

    let listeMenu = document.createElement("ul")
    for (moment in repas) {
        let etapeRepas = document.createElement("li");
        etapeRepas.textContent = moment + " : " + repas[moment];
        listeMenu.appendChild(etapeRepas);
    }
    menu.appendChild(listeMenu);
}

//ajout à l'objet menu
let ajoutAuMenu = function(objet, clef, valeur) {
    objet[clef] = valeur;
}

//transformation d'une valeur en tableau pour cumuler plusieurs valeurs pour une entrée ; renvoit le tableau
let ajoutTableau = function(platPresent, platAjout) {
    //si on a du texte en valeur, on le convertit en tableau
    if (typeof platPresent === "string") {
        platPresent = [platPresent];
    }

    platPresent[platPresent.length] = platAjout;
    return platPresent;
}

//affichage d'une erreur dans le DOM
let messageErreur = function(zoneAffichage) {
    let messageErreur = document.createElement("p");
    zoneAffichage.textContent = "";
    messageErreur.textContent = "Une ou des case(s) du formulaire semble(nt) vide(s)";
    zoneAffichage.appendChild(messageErreur);
}
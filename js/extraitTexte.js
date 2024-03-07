export class extraitTexte {
  static extraits = []; // Correct pour stocker les extraits

  // Méthode statique correcte pour ajouter un extrait de texte
  static ajouterExtrait(titre, extrait) {
    // Ajoute un objet avec titre et extrait au tableau
    extraitTexte.extraits.push({titre, extrait});
  }

  // Méthode statique pour obtenir tous les extraits
  static obtenirExtraits() {
    return extraitTexte.extraits;
  }
}
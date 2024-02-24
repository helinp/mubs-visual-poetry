/**
 * Supprime les caractères spéciaux d'une chaîne.
 * Laisse les espaces et les chiffres.
 * @param {string} str - La chaîne de caractères à nettoyer.
 * @returns {string} La chaîne nettoyée, sans caractères spéciaux.
 */
export function removeSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9 \n\r]/g, ''); 
}

/**
 * Compte les occurrences de chaque caractère dans une chaîne et retourne un tableau trié de ces comptes.
 * @param {string} str - La chaîne de caractères pour laquelle compter les occurrences.
 * @returns {Array.<[string, number]>} Un tableau de tuples [caractère, nombre d'occurrences], trié par caractère.
 */
export function getAllCharsWithCounts(str) {
   
    const occurrences = {};
  
    // Parcourt chaque caractère de la chaîne, incluant les espaces et retours à la ligne
    for (let lettre of str) {
      if (lettre === ' ' || lettre === '\n') {
        lettre = 'space';
      }

      // Si la lettre existe déjà dans l'objet, incrémente son compteur, sinon l'initialise à 1
      occurrences[lettre] = (occurrences[lettre] || 0) + 1;
    }
  
    return occurrences;
}

/**
 * Remplace les caractères accentués par leur équivalent non-accentué.
 * 
 * @param {string} str 
 * @returns 
 */
export function convertAccentedLetters(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
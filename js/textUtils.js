/**
 * Supprime les caractères spéciaux d'une chaîne.
 * Laisse les espaces et les chiffres.
 * @param {string} str - La chaîne de caractères à nettoyer.
 * @returns {string} La chaîne nettoyée, sans caractères spéciaux.
 */
export function removeSpecialChars(str) {
  // Utilisation d'une plage Unicode pour inclure les lettres avec diacritiques
  return str.replace(/[^\w\d\s\n\r\u00C0-\u00FF\u0100-\u017F\u0180-\u024F]/g, ''); 
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

/**
 * Génère une chaîne de caractères où chaque lettre de l'alphabet est répétée selon sa position.
 * 
 * @returns string
 */
export function generateDuplicatedAlphabet(alphabet = 'abcdefghijklmnopqrstuvwxyz') {

  let result = '';

  // Parcourir chaque lettre de l'alphabet
  for (let i = 0; i < alphabet.length; i++) {
    // Dupliquer la lettre selon sa position (i+1) fois
    for (let j = 0; j <= i; j++) {
      result += alphabet[i];
    }
  }

  return result;
}
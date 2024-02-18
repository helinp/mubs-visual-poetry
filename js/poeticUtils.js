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
    // retire les espaces et retours à la ligne
    str = str.replace(/[\n\r\s ]/g, '');

    const counts = {};
    str.split('').forEach(char => {
        counts[char] = (counts[char] || 0) + 1;
    });

    return Object.keys(counts).sort().map(key => [key, counts[key]]);
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
 * Convertit une valeur d'une plage à une autre.
 * @param {number} value - La valeur à convertir.
 * @param {number} low1 - La borne inférieure de la plage d'origine.
 * @param {number} high1 - La borne supérieure de la plage d'origine.
 * @param {number} low2 - La borne inférieure de la plage de destination.
 * @param {number} high2 - La borne supérieure de la plage de destination.
 * @returns {number} La valeur convertie dans la nouvelle plage.
 */
export function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
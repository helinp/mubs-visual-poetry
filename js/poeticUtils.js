/**
 * Supprime les caractères spéciaux d'une chaîne.
 * Laisse les espaces et les chiffres.
 * @param {string} str - La chaîne de caractères à nettoyer.
 * @returns {string} La chaîne nettoyée, sans caractères spéciaux.
 */
export function removeSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, ''); 
}


/**
 * Compte les occurrences de chaque caractère dans une chaîne et retourne un tableau trié de ces comptes.
 * @param {string} str - La chaîne de caractères pour laquelle compter les occurrences.
 * @returns {Array.<[string, number]>} Un tableau de tuples [caractère, nombre d'occurrences], trié par caractère.
 */
export function getAllCharsWithCounts(str) {
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
 * Crée un dégradé de couleurs entre deux couleurs HEX.
 * @param {string} startColor - Couleur de départ en HEX.
 * @param {string} endColor - Couleur de fin en HEX.
 * @param {number} steps - Nombre de pas/couleurs dans le dégradé.
 * @returns {string[]} Un tableau des couleurs du dégradé en HEX.
 */
export function createGradient(startColor, endColor, steps) {
    let startRGB = hexToRGB(startColor);
    let endRGB = hexToRGB(endColor);
    let colors = [];
    for (let i = 0; i < steps; i++) {
        colors.push(convertRGBToHex([
            Math.round(startRGB[0] + ((endRGB[0] - startRGB[0]) / (steps - 1)) * i),
            Math.round(startRGB[1] + ((endRGB[1] - startRGB[1]) / (steps - 1)) * i),
            Math.round(startRGB[2] + ((endRGB[2] - startRGB[2]) / (steps - 1)) * i)
        ]));
    }
    return colors;
}

/**
 * Convertit une valeur RGB en sa représentation HEX.
 * @param {number[]} rgb - Un tableau contenant les valeurs RGB.
 * @returns {string} La couleur au format HEX.
 */
function convertRGBToHex(rgb) {
    return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Convertit une couleur HEX en ses composantes RGB.
 * @param {string} hex - La couleur au format HEX.
 * @returns {number[]} Les composantes RGB de la couleur.
 */
function hexToRGB(hex) {
    return hex.match(/\w\w/g).map(x => parseInt(x, 16));
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
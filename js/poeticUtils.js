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
 * 
 * @param {*} startColor RGB HEX
 * @param {*} endColor RGB HEX
 * @param {number} steps 
 * @return {string[]} Un tableau des couleurs du dégradé en CMJN (Cyan, Magenta, Jaune, Noir).
 */
export function createGradientCMJN(startColor, endColor, steps) {
    let startCMYK = hexToCMYK(startColor);
    let endCMYK = hexToCMYK(endColor);
    let gradient = [];

    for (let i = 0; i < steps; i++) {
        let stepCMYK = startCMYK.map((start, index) => {
            return Math.round(start + ((endCMYK[index] - start) / (steps - 1)) * i);
        });
        //[c, m, y, k]
        gradient.push(stepCMYK);
    }

    return gradient;
}

/**
 * Créé un dégradé passant par toutes les couleurs CMJN.
 * @param {number} steps 
 * @returns 
 */
export function createFullGradientCMJN(steps) {
    let gradient = [];
    for (let i = 0; i < steps; i++) {
        // Crée un effet dégradé en modifiant progressivement la valeur de chaque composante
        let c = (i * 100 / steps) % 100;
        let m = ((i + steps / 4) * 100 / steps) % 100;
        let y = ((i + steps / 2) * 100 / steps) % 100;
        let k = ((i + 3 * steps / 4) * 100 / steps) % 100;
        gradient.push([Math.round(c), Math.round(m), Math.round(y), Math.round(k)]);
    }
    return gradient;
}


/**
 * Créé un dégradé passant par toutes les couleurs RGB.
 * @param {number} steps 
 * @returns 
 */
export function createFullGradient(steps) {
    let gradient = [];
    let phaseLength = steps / 3;

    for (let i = 0; i < steps; i++) {
        let r = Math.round(Math.sin(Math.PI / phaseLength * i) * 255) % 255;
        let g = Math.round(Math.sin(Math.PI / phaseLength * (i + phaseLength / 3)) * 255) % 255;
        let b = Math.round(Math.sin(Math.PI / phaseLength * (i + 2 * phaseLength / 3)) * 255) % 255;
        gradient.push(convertRGBToHex([r, g, b]));
    }
    return gradient;
}


/**
 * Convertit une valeur RGB en CMJN
 */
function convertRGBToCMJN(rgb) {
    let c = 1 - (rgb[0] / 255);
    let m = 1 - (rgb[1] / 255);
    let y = 1 - (rgb[2] / 255);
    let k = Math.min(c, m, y);

    c = ((c - k) / (1 - k)) || 0;
    m = ((m - k) / (1 - k)) || 0;
    y = ((y - k) / (1 - k)) || 0;

    // Convertir les valeurs CMJN en pourcentage
    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    return [c, m, y, k];
}

/**
 * Convertit une valeur RGB en sa représentation HEX.
 * @param {number[]} rgb - Un tableau contenant les valeurs RGB.
 * @returns {string} La couleur au format HEX.
 */
function convertRGBToHex(rgb) {
    return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
}

function hexToCMYK(hex) {
    let rgb = hexToRGB(hex);
    let cmyk = convertRGBToCMJN(rgb);
    return cmyk; // Retourne un tableau [C, M, Y, K]
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
import { mapRange } from "./poeticUtils.js";


/**
 * convertit une couleur RGB en HSL
 */
export function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // couleur achromatique
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}


/**
 * convertit une couleur HSL en RGB
 * @param {number} h - Hue
 * @param {number} s - Saturation
 * @param {number} l - Lightness
 * @returns {number[]} Un tableau des valeurs RGB Int.
 */
export function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // couleur achromatique
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255].map(Math.round);
}

export function hslToCmnj(h, s, l) {
    let rgb = hslToRgb(h, s, l);
    return convertRGBToCMJN(rgb);
}

/** Créé un dégradé entre 2 couleurs HSL 
 *  
 * @param {*} startColor au format HSL
 * @param {*} endColor au format HSL
 * @param {number} steps
 * 
 * @returns {number[]} Un tableau des couleurs du dégradé en HSL.
*/
function createGradientHSL(startColor, endColor, steps) {
    let startHue = startColor[0];
    let endHue = endColor[0];

    let startSaturation = startColor[1];
    let endSaturation = endColor[1];

    let startLightness = startColor[2];
    let endLightness = endColor[2];

    let gradient = [];

    for (let i = 0; i < steps; i++) {

        let stepHue = mapRange(i, 0, steps, startHue, endHue);
        let stepSaturation = mapRange(i, 0, steps, startSaturation, endSaturation);
        let stepLightness = mapRange(i, 0, steps, startLightness, endLightness);

        gradient.push([stepHue, stepSaturation, stepLightness]);
    }

    return gradient;
}


/**************************** */


/**
 * Controller pour la création de dégradés de couleurs.
 * @param {string} startColor HEX
 * @param {string} endColor HEX
 * @param {number} steps nombre de pas
 * @param {string} gradientType interpolation ou hue
 * @param {string} colorSpace rgb ou cmjn
 * @returns 
 */
export function createCustomGradient(startColor, endColor, steps, gradientType, colorSpace) {

    let gradient = [];

    let startRGB = hexToRGB(startColor);
    let endRGB = hexToRGB(endColor);

    let startHSL = [];
    let endHSL = [];

    if (gradientType === 'hue') {
        startHSL = rgbToHsl(...startRGB);
        endHSL = rgbToHsl(...endRGB);
    }

    // RGB
    if (colorSpace === 'rgb' && gradientType === 'interpolation') {
        gradient = createGradientRgb(startColor, endColor, steps);
    } else if (colorSpace === 'rgb' && gradientType === 'hue') {
        let hslGradient = createGradientHSL(startHSL, endHSL, steps);
        gradient = hslGradient.map(hsl => {
            return convertRGBToHex(hslToRgb(...hsl));
        });
    }

    // CMJN
    if (colorSpace === 'cmjn' && gradientType === 'interpolation') {
        gradient = createGradientCMJN(startColor, endColor, steps);
    } else if (colorSpace === 'cmjn' && gradientType === 'hue') {
        let hslGradient = createGradientHSL(startHSL, endHSL, steps);
        gradient = hslGradient.map(hsl => {
            return hslToCmnj(...hsl);
        });
    }

    return gradient;
}


export function createFullGradient(steps, colorSpace) {
    let gradient = [];
    if (colorSpace === 'rgb') {
        gradient = createFullGradientRGB(steps);
    } else if (colorSpace === 'cmjn') {
        gradient = createFullGradientCMJN(steps);
    }
    return gradient;
}


/**
 * Crée un dégradé de couleurs entre deux couleurs HEX.
 * @param {string} startColor - Couleur de départ en HEX.
 * @param {string} endColor - Couleur de fin en HEX.
 * @param {number} steps - Nombre de pas/couleurs dans le dégradé.
 * @returns {string[]} Un tableau des couleurs du dégradé en HEX.
 */
function createGradientRgb(startColor, endColor, steps) {
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
function createGradientCMJN(startColor, endColor, steps) {
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
 * CHATGPT - Je n'y comprends encore rien ^^ 
 * @param {number} steps 
 * @returns 
 */
export function createFullGradientCMJN(steps = 30) {
    let gradient = [];
    // Calcul des étapes pour chaque phase de transition principale
    let phaseLength = steps / 4;
    // Couverture d'encre ajustée pour chaque phase, en gardant à l'esprit la limite de 300%
    let coverageIncrement = (200 / steps) * 4; // Ajustement pour s'assurer que la couverture varie correctement

    for (let i = 0; i < steps; i++) {
        let phase = Math.floor((i / phaseLength) % 4); // Détermine la phase actuelle
        let progress = (i % phaseLength) / phaseLength; // Progression dans la phase actuelle
        let nextProgress = ((i + phaseLength) % phaseLength) / phaseLength; // Progression pour la composante suivante

        // Initialisation des composantes CMJN
        let c = 0, m = 0, y = 0, k = 0;

        // Calcul de la couverture d'encre pour la composante actuelle et la suivante
        let currentCoverage = Math.min(100, coverageIncrement * i);
        let nextCoverage = Math.max(0, currentCoverage - 100); // Ajuste pour la transition entre les composantes

        // Ajustement des composantes en fonction de la phase
        switch (phase) {
            case 0: // Transition de C à M
                c = currentCoverage;
                m = nextCoverage;
                break;
            case 1: // Transition de M à Y
                m = currentCoverage;
                y = nextCoverage;
                break;
            case 2: // Transition de Y à K
                y = currentCoverage;
                k = nextCoverage;
                break;
            case 3: // Transition de K à C (réinitialisation pour un nouveau cycle)
                k = currentCoverage;
                c = nextCoverage;
                break;
        }

        // Assure que la somme des composantes ne dépasse pas 300%
        let totalCoverage = c + m + y + k;
        if (totalCoverage > 300) {
            let excess = totalCoverage - 300;
            // Réduit proportionnellement chaque composante pour éliminer l'excès
            c -= excess * (c / totalCoverage);
            m -= excess * (m / totalCoverage);
            y -= excess * (y / totalCoverage);
            k -= excess * (k / totalCoverage);
        }

        // Ajoute le mélange de couleurs au gradient
        gradient.push([Math.round(c), Math.round(m), Math.round(y), Math.round(k)]);
    }

    return gradient;
}






/**
 * Créé un dégradé passant par toutes les couleurs RGB.
 * CHATGPT
 * @param {number} steps 
 * @returns 
 */
export function createFullGradientRGB(steps) {
    let gradient = [];
    let phaseLength = steps / 3;

    for (let i = 0; i < steps; i++) {
        let r, g, b;
        if (i < phaseLength) {
            // Phase 1: Rouge à Vert, Bleu constant à 0
            r = Math.round(255 * (1 - i / phaseLength));
            g = Math.round(255 * (i / phaseLength));
            b = 0;
        } else if (i < 2 * phaseLength) {
            // Phase 2: Vert à Bleu, Rouge constant à 0
            r = 0;
            g = Math.round(255 * (1 - (i - phaseLength) / phaseLength));
            b = Math.round(255 * ((i - phaseLength) / phaseLength));
        } else {
            // Phase 3: Bleu à Rouge, Vert constant à 0
            r = Math.round(255 * ((i - 2 * phaseLength) / phaseLength));
            g = 0;
            b = Math.round(255 * (1 - (i - 2 * phaseLength) / phaseLength));
        }
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
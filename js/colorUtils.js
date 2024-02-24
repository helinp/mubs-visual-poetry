import { mapRange } from "./poeticUtils.js";
import { textClass } from "./textClass.js";


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


/**************************** */


/**
 * Controller pour la création de dégradés de couleurs.
 * @param {string} startColor HEX
 * @param {string} endColor HEX
 * @param {textClass} text
 * @param {string} gradientType interpolation ou hue
 * @param {string} colorSpace rgb ou cmjn
 * @returns 
 */
export function createCustomGradient(startColor, endColor, text, gradientType, colorSpace) {

    let gradient = [];

    let startRGB = hexToRGB(startColor);
    let endRGB = hexToRGB(endColor);

    let startHSL = [];
    let endHSL = [];

    let letters = text.getDistinctChars();

    if (gradientType === 'hue') {
        startHSL = rgbToHsl(...startRGB);
        endHSL = rgbToHsl(...endRGB);
    }

    // RGB
    if (colorSpace === 'rgb' && gradientType === 'interpolation') {
        gradient = createGradientRgb(startColor, endColor, letters);
    } else if (colorSpace === 'rgb' && gradientType === 'hue') {
        let hslGradient = createGradientHSL(startHSL, endHSL, letters);
        gradient = convertGradientHSLtoRGB(hslGradient);
    }

    // CMJN
    if (colorSpace === 'cmjn' && gradientType === 'interpolation') {
        gradient = createGradientCMJN(startColor, endColor, letters);
    } else if (colorSpace === 'cmjn' && gradientType === 'hue') {
        let hslGradient = createGradientHSL(startHSL, endHSL, letters);
        gradient = convertGradientHSLtoCMJN(hslGradient);
    }

    return gradient;
}


/**
 * Fonction controller pour la création d'un dégradé complet.
 * @param {textClass} text
 * @param {string} colorSpace cmjn ou rgb
 * @returns 
 */
export function createFullGradient(letters, colorSpace) {
    let gradient = [];
    if (colorSpace === 'rgb') {
        gradient = createFullGradientRGB(letters);
    } else if (colorSpace === 'cmjn') {
        gradient = createFullGradientCMJN(letters);
    }
    return gradient;
}

function shortestHuePath(startHue, endHue) {
    let directPath = endHue - startHue;
    let roundPath = (directPath < 0) ? directPath + 360 : directPath - 360;
    return Math.abs(directPath) < Math.abs(roundPath) ? directPath : roundPath;
}


/** Créé un dégradé entre 2 couleurs HSL 
 *  
 * @param {*} startColor au format HSL
 * @param {*} endColor au format HSL
 * @param {textClass} text
 * 
 * @returns {number[]} Un tableau des couleurs du dégradé en HSL.
*/
function createGradientHSL(startColor, endColor, text) {
    let startHue = startColor[0];
    let endHue = startColor[0] + shortestHuePath(startColor[0], endColor[0]);
    let gradient = [];
    let steps = Object.keys(text).length;

    let startSaturation = startColor[1];
    let endSaturation = endColor[1];

    let startLightness = startColor[2];
    let endLightness = endColor[2];

    for (let i = 0; i < steps; i++) {
        let currentLetter = text[i];
        let stepHue = mapRange(i, 0, steps - 1, startHue, endHue) % 360;
        if (stepHue < 0) stepHue += 360; // Assurez-vous que la teinte est toujours positive
        let stepSaturation = mapRange(i, 0, steps - 1, startSaturation, endSaturation);
        let stepLightness = mapRange(i, 0, steps - 1, startLightness, endLightness);

        gradient[currentLetter] = [stepHue, stepSaturation, stepLightness];
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
function createGradientRgb(startColor, endColor, letters) {
    let startRGB = hexToRGB(startColor);
    let endRGB = hexToRGB(endColor);
    let gradient = [];
    let steps = Object.keys(letters).length;

    for (let i = 0; i < steps; i++) {
        let currentLetter = letters[i];

        gradient[currentLetter] = convertRGBToHex([
            Math.round(startRGB[0] + ((endRGB[0] - startRGB[0]) / (steps - 1)) * i),
            Math.round(startRGB[1] + ((endRGB[1] - startRGB[1]) / (steps - 1)) * i),
            Math.round(startRGB[2] + ((endRGB[2] - startRGB[2]) / (steps - 1)) * i)
        ]);
    }
    return gradient;
}

/**
 * 
 * @param {*} startColor RGB HEX
 * @param {*} endColor RGB HEX
 * @param {number} steps 
 * @return {string[]} Un tableau des couleurs du dégradé en CMJN (Cyan, Magenta, Jaune, Noir).
 */
function createGradientCMJN(startColor, endColor, letters) {
    let startCMYK = hexToCMYK(startColor);
    let endCMYK = hexToCMYK(endColor);
    let gradient = [];
    let steps = Object.keys(letters).length;

    for (let i = 0; i < steps; i++) {
        let currentLetter = letters[i];

        let stepCMYK = startCMYK.map((start, index) => {
            return Math.round(start + ((endCMYK[index] - start) / (steps - 1)) * i);
        });
        //[c, m, y, k]
        gradient[currentLetter] = stepCMYK;
    }
    return gradient;
}

/**
 * Créé un dégradé passant par toutes les couleurs CMJN.
 * @param {number} steps 
 * @returns 
 */
export function createFullGradientCMJN(steps = 30) {
    // TO IMPLEMENT
    console.error('createFullGradientCMJN not implemented');
}

/**
 * Créé un dégradé passant par toutes les couleurs RGB.
 * @param {number} steps 
 * @returns 
 */
export function createFullGradientRGB(text) {
    // TO IMPLEMENT
    console.error('createFullGradientRGB not implemented');
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

/******* */
function convertGradientHSLtoCMJN(hslGradient) {
    let gradient = [];
    for (let letter in hslGradient) {
        gradient[letter] = hslToCmnj(...hslGradient[letter]);
    }
    return gradient;
}

function convertGradientHSLtoRGB(hslGradient) {
    let gradient = [];
    for (let letter in hslGradient) {
        gradient[letter] = hslToRgb(...hslGradient[letter]);
    }
    return gradient;
}
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

export function calculateInnerFrameHeight(text, radius, spacing, width, lineSpacing) {
    let lines = text.getText().split('\n'); // Sépare le texte en lignes
    let nbLines = 0;

    for (let line of lines) {
        let nbChars = line.length;
        let lineWidth = nbChars * (radius + spacing);
        let nbLineTemp = Math.ceil(lineWidth / width);

        if(nbLineTemp == 0) {
           nbLineTemp = 1;
        } else if(nbLineTemp > 1) {
            nbLineTemp--;
        }

        nbLines += nbLineTemp;
    }

    return nbLines * ((radius * 2) + lineSpacing) - lineSpacing;
}

export function calculateInnerFramePosition(width, height, innerFrameWidth, innerFrameHeight) {
    let x = Math.round((width - innerFrameWidth) / 2);
    let y = Math.round((height - innerFrameHeight) / 2);

    return [x, y];
}
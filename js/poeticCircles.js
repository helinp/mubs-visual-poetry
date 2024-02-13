
import { getAllCharsWithCounts } from './poeticUtils.js';
import { mapRange } from './poeticUtils.js';

export class poeticCircles {

    // liste des formes possibles (définies dans canvasShapes.js) 
    // et la correspondance avec la fonction qui les dessine
    shapeFunctions = {};

    showSpaces = false;

    draw() {

        if (!this.isCapSensitive) {
            this.text = this.text.toLowerCase();
        }

        // Calcule les variables de génération
        let charsWithCounts = getAllCharsWithCounts(this.text);
        let textDistinctChars = charsWithCounts.map(char => char[0]); // récupère les caractères uniques
        let textOccurences = charsWithCounts.map(char => char[1]); // récupère les occurences des caractères

        this.drawer(textDistinctChars, textOccurences);
    }

    /**
     * Dessine dans le canvas.
     * 
     * @param {*} textDistinctChars 
     * @param {*} textOccurences 
     */
    drawer(textDistinctChars, textOccurences) { }

    getMapOccurences(textOccurences) {
        return textOccurences.map(occurence => mapRange(occurence, 1, Math.max(...textOccurences), this.circleSizeMin, this.circleSizeMax));
    }

    drawLoopHandler(i, textDistinctChars, mapOccurences, colors, x, y, spacing, radius, drawObject) {

        if (this.showSpaces && this.text[i] === ' ') {
            // 
        } else if (this.useLineBreaks && this.text[i] === '\n') {
            // On revient à la position de départ
            x = radius + (radius / 2);
            // On saute une ligne
            y += spacing;
            return [x, y];
            
        } else {

            // TODO: utiliser une classe adaptateur pour faire correspondre les méthodes de dessin de canvas et de pdf
            if (Object.getPrototypeOf(drawObject).hasOwnProperty('fillColor')) {
            } else {
                drawObject.beginPath();
            }

            let indexChar = textDistinctChars.indexOf(this.text[i]); // trouve l'index du caractère dans textDistinctChars
            let correctedRadius = mapOccurences[indexChar]; // trouve la taille du cercle pour le caractère

            // Choix de la forme
            if (this.circleShape in this.shapeFunctions) {
                this.shapeFunctions[this.circleShape](drawObject, x, y, correctedRadius);
            } else {
                // Si la forme n'est pas dans la liste, on en choisit une au hasard
                let randomShape = Object.keys(this.shapeFunctions)[Math.floor(Math.random() * Object.keys(this.shapeFunctions).length)];
                this.shapeFunctions[randomShape](drawObject, x, y, correctedRadius);
            }

            // Remplir le cercle avec la couleur correspondante
            // TODO: utiliser une classe adaptateur pour faire correspondre les méthodes de dessin de canvas et de pdf
            if (Object.getPrototypeOf(drawObject).hasOwnProperty('fillColor')) {
                drawObject.fillColor(colors[indexChar]);
            } else {
                drawObject.fillStyle = colors[indexChar];
                drawObject.fill();
                drawObject.closePath();
            }
        }

        // Mise à jour de la position de x pour le prochain cercle
        x += spacing;

        // Si le prochain cercle dépasse la largeur du canvas
        if (x + spacing >= this.width) {
            // On revient à la position de départ
            x = radius + (radius / 2);
            // On saute une ligne
            y += spacing;
        }

        return [x, y];
    }

    //
    // Setters
    //
    setBackGroundColor(color) {
        this.backgroundColor = color;
    }

    setCircleSizeMin(size) {
        this.circleSizeMin = size;
    }

    setCircleSizeMax(size) {
        this.circleSizeMax = size;
    }

    setCircleSpacing(size) {
        this.circleSpacing = size;
    }

    setStartColor(color) {
        this.startColor = color;
    }

    setEndColor(color) {
        this.endColor = color;
    }

    setCircleShape(shape) {
        this.circleShape = shape;
    }

    setShowSpaces(bool) {
        this.showSpaces = bool;
    }

    setIsCapSensitive(bool) {
        this.isCapSensitive = bool;
    }

    setUseLineBreaks(bool) {
        this.useLineBreaks = bool;
    }

    setUseCustomGradient(bool) {
        this.useCustomGradient = bool;
    }
    
}

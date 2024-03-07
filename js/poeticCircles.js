
import { calculateInnerFramePosition, calculateInnerFrameHeight, mapRange } from './poeticUtils.js';
import { textClass } from './textClass.js';

export class poeticCircles {

    shapeFunctions = {};
    showSpaces = false;
    innerFrameX = 0;
    innerFrameY = 0;

    draw() {

        if (this.isCapSensitive === false) {
            this.text.lowerCase();
        }

        if(this.showSpaces === false){
            this.text.removeSpaces();
        }

        if(this.useLineBreaks === false){
            this.text.removeLineBreaks();
        }

        if(this.ignoreSpecialChars === true){
            this.text.removeSpecialChars();
        }

        // calcule position de l'inner frame
        let maxInnerFrameHeight = calculateInnerFrameHeight(
            this.text, 
            this.circleSizeMax, 
            this.circleSpacing, 
            this.innerFrameWidth, 
            this.lineSpacing
        );

        this.innerFrameHeight = maxInnerFrameHeight;

        let innerPosition = calculateInnerFramePosition(
            this.width, 
            this.height, 
            this.innerFrameWidth, 
            maxInnerFrameHeight
        );

        this.innerFrameX = innerPosition[0];
        this.innerFrameY = innerPosition[1];

        this.drawer(this.text);
    }

    drawer(textDistinctChars, textOccurences) {}

    /**
     * 
     * @param {number} i 
     * @param {textClass} text 
     * @param {*} colors 
     * @param {*} x 
     * @param {*} y 
     * @param {*} spacing 
     * @param {*} radius 
     * @param {*} drawObject 
     * @returns 
     */
    drawLoopHandler(i, text, colors, x, y, spacing, radius, drawObject) {

        let currentLetter = text.getText()[i];
        let letterOccurences = text.getLetterOccurences(currentLetter);

        if (! this.showSpaces && currentLetter === ' ') {
            return [x, y];
        } else if (this.showSpaces && currentLetter === ' ') {
            // ne rien faire
        } else if (this.useLineBreaks && currentLetter === '\n') {
            // On revient à la position de départ
            x = radius + this.innerFrameX;
            // On saute une ligne
            y += this.lineSpacing + (radius * 2);
            return [x, y];
        } else {

            // TODO: utiliser une classe adaptateur pour faire correspondre les méthodes de dessin de canvas et de pdf
            if (Object.getPrototypeOf(drawObject).hasOwnProperty('fillColor')) {
            } else {
                drawObject.beginPath();
            }

            // trouve la taille du cercle pour le caractère
            // TODO en faire une méthode
            let correctedRadius = Math.round(mapRange(
                letterOccurences,
                text.getSmallerOccurences(),
                text.getHighestOccurences(),
                this.circleSizeMin,
                this.circleSizeMax
            ));

            // Remplir le cercle avec la couleur correspondante
            // TODO: utiliser une classe adaptateur pour faire correspondre les méthodes de dessin de canvas et de pdf
            if (Object.getPrototypeOf(drawObject).hasOwnProperty('fillColor')) {
                drawObject.fillColor(colors[currentLetter]);
            }

            // Choix de la forme
            if (this.circleShape in this.shapeFunctions) {
                this.shapeFunctions[this.circleShape](drawObject, x, y, correctedRadius);
            } else {
                // Si la forme n'est pas dans la liste, on en choisit une au hasard
                let randomShape = Object.keys(this.shapeFunctions)[Math.floor(Math.random() * Object.keys(this.shapeFunctions).length)];
                this.shapeFunctions[randomShape](drawObject, x, y, correctedRadius);
            }
  
            if ( ! Object.getPrototypeOf(drawObject).hasOwnProperty('fillColor')) {
                drawObject.fillStyle = colors[currentLetter];
                drawObject.fill();
                drawObject.closePath();
            }

        }

        // Mise à jour de la position de x pour le prochain cercle
        x += spacing;

        // Si le prochain cercle dépasse la largeur du canvas
        if (x  >= this.innerFrameWidth + this.innerFrameX) {
            // On revient à la position de départ
            x = radius + this.innerFrameX;
            // On saute une ligne
            y += this.lineSpacing + (radius * 2);
        }

        return [x, y];
    }

    //
    // Setters
    //
    backgroundColor = '#ffffff';
    circleSizeMin = 5;
    circleSizeMax = 50;
    circleSpacing = 10;
    startColor = '#000000';
    endColor = '#ffffff';
    circleShape = 'circle';
    showSpaces = false;
    isCapSensitive = false;
    useLineBreaks = false;
    useCustomGradient = true;
    gradientType = 'linear';
    lineSpacing = 10;
    ignoreSpecialChars = false;

    /**
     * Définit le texte à afficher.
     * 
     * @param {textClass}
     */
    setText(text) {
        this.text = text;
    }

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
    
    setGradientType(type) {
        this.gradientType = type;
    }

    setLineSpacing(size) {
        this.lineSpacing = size;
    }

    setInnerFrameWidth(size) {
        this.innerFrameWidth = size;
    }

    setIgnoreSpecialChars(bool) {
        this.ignoreSpecialChars = bool;
    }
}

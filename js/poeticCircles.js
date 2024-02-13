
import { createGradient, getAllCharsWithCounts, mapRange } from './poeticUtils.js';
import { ctxMakeCircle, ctxMakeSquare, ctxMakeTriangle, ctxMakeHexagon, ctxMakeHeart, ctxMakeRing } from './canvasShapes.js';

export class poeticCircles {

    // liste des formes possibles (définies dans canvasShapes.js) 
    // et la correspondance avec la fonction qui les dessine
    shapeFunctions = {
        'circle': ctxMakeCircle,
        'square': ctxMakeSquare,
        'triangle': ctxMakeTriangle,
        'hexagon': ctxMakeHexagon,
        'heart': ctxMakeHeart,
        'ring': ctxMakeRing
    };

    showSpaces = false;

    constructor(canvasId, width = 500, height = 500, text = '') {

        this.canvas = document.getElementById(canvasId);

        if (!this.canvas) {
            console.error('Canvas not found');
            throw new Error('Canvas not found');
        }
        this.canvas.width = width;
        this.canvas.height = height;

        this.text = text;
        this.width = width;
        this.height = height;
    }

    draw(destinationType = 'canvas') {
        // calcule les variables de génération
        let charsWithCounts = getAllCharsWithCounts(this.text);
        let textDistinctChars = charsWithCounts.map(char => char[0]); // récupère les caractères uniques
        let textOccurences = charsWithCounts.map(char => char[1]); // récupère les occurences des caractères

        if (destinationType === 'canvas') {
            this.drawInCanvas(textDistinctChars, textOccurences);
        }
    }

    /**
     * Dessine dans le canvas.
     * 
     * @param {*} textDistinctChars 
     * @param {*} textOccurences 
     */
    drawInCanvas(textDistinctChars, textOccurences) {
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');

        let radius = this.circleSizeMax
        let x = radius + (radius / 2);
        let y = x;
        let spacing = radius + this.circleSpacing;

        // Efface le canvas avant de dessiner
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // mappe les occurences pour obtenir les tailles des cercles
        let mapOccurences = textOccurences.map(occurence => mapRange(occurence, 1, Math.max(...textOccurences), this.circleSizeMin, this.circleSizeMax));
        let colors = createGradient(this.startColor, this.endColor, textDistinctChars.length);

        // Pour chaque caractère dans this.text
        for (let i = 0; i < this.text.length; i++) {

            if (this.showSpaces && this.text[i] === ' ') {
                // do nothing
            } else {

                let indexChar = textDistinctChars.indexOf(this.text[i]); // trouve l'index du caractère dans textDistinctChars
                let correctedRadius = mapOccurences[indexChar]; // trouve la taille du cercle pour le caractère

                // On commence à dessiner
                ctx.beginPath();

                // Choix de la forme
                if (this.circleShape in this.shapeFunctions) {
                    this.shapeFunctions[this.circleShape](ctx, x, y, correctedRadius);
                } else {
                    // Si la forme n'est pas dans la liste, on en choisit une au hasard
                    let randomShape = Object.keys(this.shapeFunctions)[Math.floor(Math.random() * Object.keys(this.shapeFunctions).length)];
                    this.shapeFunctions[randomShape](ctx, x, y, correctedRadius);
                }

                // Remplir le cercle avec la couleur correspondante
                ctx.fillStyle = colors[indexChar];
                ctx.fill();

                // On termine de dessiner
                ctx.closePath(); 
            }
            
            // Mise à jour de la position de x pour le prochain cercle
            x += spacing;

            // Si le prochain cercle dépasse la largeur du canvas
            if (x + spacing >= canvas.width) {
                // On revient à la position de départ
                x = radius + (radius / 2);
                // On saute une ligne
                y += spacing;
            }
        }
    }

    //
    // Setters
    //
    setBackGroundColor(color) {
        this.canvas.style.backgroundColor = color;
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
}

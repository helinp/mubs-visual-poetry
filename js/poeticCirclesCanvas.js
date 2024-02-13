import { poeticCircles } from './poeticCircles.js';
import { createGradient, createFullGradient, mapRange } from './poeticUtils.js';
import { ctxMakeCircle, ctxMakeSquare, ctxMakeTriangle, ctxMakeHexagon, ctxMakeHeart, ctxMakeRing } from './canvasShapes.js';

export class poeticCirclesCanvas extends poeticCircles {

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

    constructor(canvasId, width = 500, height = 500, text = '') {

        super(); // appelle le constructeur de la classe mère

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

    /**
     * Dessine dans le canvas.
     * 
     * @param {*} textDistinctChars 
     * @param {*} textOccurences 
     */
    drawer(textDistinctChars, textOccurences) {
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');

        let radius = this.circleSizeMax
        let x = radius + (radius / 2);
        let y = x;
        let spacing = radius + this.circleSpacing;

        // Efface le canvas avant de dessiner
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // background color
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // mappe les occurences pour obtenir les tailles des cercles
        let mapOccurences = this.getMapOccurences(textOccurences);

        let colors = [];
        if(this.useCustomGradient){
            colors = createGradient(this.startColor, this.endColor, textDistinctChars.length);
        } else {
            colors = createFullGradient(textDistinctChars.length);
        }
          let coords = [];

        // Pour chaque caractère dans this.text
        for (let i = 0; i < this.text.length; i++) {
            coords = this.drawLoopHandler(i, textDistinctChars, mapOccurences, colors, x, y, spacing, radius, ctx);
            x = coords[0];
            y = coords[1];
        }
    }
}

import { poeticCircles } from './poeticCircles.js';
import { createCustomGradient, createFullGradient } from './colorUtils.js';
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
     */
    drawer(text) {

        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');

        let radius = this.circleSizeMax
        let x = 0;
        let y = 0;
        let spacing = radius + this.circleSpacing;

        // inner frame
        x = radius + this.innerFrameX;
        y = radius + this.innerFrameY;

        // Efface le canvas avant de dessiner
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // background color
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let colors = [];
        if (this.useCustomGradient) {
            colors = createCustomGradient(this.startColor, this.endColor, text, this.gradientType, 'rgb');
        } else {
            colors = createFullGradient(text.getOccurencesLength(), 'rgb');
        }
        let coords = [];

        // Pour chaque caractère dans this.text
        for (let i = 0; i < this.text.getLength(); i++) {
            coords = this.drawLoopHandler(i, text, colors, x, y, spacing, radius, ctx);
            x = coords[0];
            y = coords[1];
        }
    }

    drawInnerFrame() {
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');

        let [x, y] = this.calculateInnerFramePosition();

        ctx.beginPath();
        ctx.rect(x, y, this.innerFrameWidth, this.innerFrameHeight);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

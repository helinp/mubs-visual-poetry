import { poeticCircles } from './poeticCircles.js';
import { createCustomGradient, createFullGradient } from './colorUtils.js';
import { pdfSquare, pdfCircle, pdfRing, pdfHeart, pdfTriangle, pdfHexagon } from "./pdfShapes.js";
import { textClass } from './textClass.js';

export class poeticCirclesPdf extends poeticCircles {

    // liste des formes possibles (définies dans canvasShapes.js) 
    // et la correspondance avec la fonction qui les dessine
    shapeFunctions = {
        'circle': pdfCircle,
        'square': pdfSquare,
        'ring': pdfRing,
        'heart': pdfHeart,
        'triangle': pdfTriangle,
        'hexagon': pdfHexagon
    };

    doc = null;
    stream = null;

    /**
     * @param {textClass} text 
     * @param {string} orientation 'landscape' ou 'portrait'
     * @param {string} format 'ex: A4'
     */
    constructor(text, orientation = 'landscape', format = 'A4') {

        super(); // appelle le constructeur de la classe mère

        this.text = text;

        this.doc = new PDFDocument({ size: format, layout: orientation });
        this.stream = this.doc.pipe(blobStream());

        this.width = this.doc.page.width;
        this.height = this.doc.page.height;
    }

    /**
     * Dessine dans le PDF.
     * 
     * @param {textClass} 
     */
    drawer(text) {

       this.doc.rect(0, 0, this.width, this.height).fill(this.backgroundColor);
       // this.drawInnerFrame(); // debug

        let radius = this.circleSizeMax
        let x = 0;
        let y = 0;
        let spacing = radius + this.circleSpacing;

        // inner frame
        x = radius + this.innerFrameX;
        y = radius + this.innerFrameY;

        let colors = [];
        if(this.useCustomGradient){
            colors = createCustomGradient(this.startColor, this.endColor, text, this.gradientType, 'cmjn');
        } else {
            colors = createFullGradient(text.getOccurencesLength(), 'cmjn');
        }
        let coords = [];

        // Pour chaque caractère dans this.text
        for (let i = 0; i < this.text.getLength(); i++) {
            coords = this.drawLoopHandler(i, text, colors, x, y, spacing, radius, this.doc);
            x = coords[0];
            y = coords[1];
        }

        // On termine le dessin
        this.doc.end();

        this.stream.on('finish', () => {
            const iframe = document.querySelector("iframe");
            if (iframe) {
                iframe.src = this.stream.toBlobURL('application/pdf');
            }
        });
    }

    /**
     * Dessine le cadre intérieur.
     * Debug purpose.
     */
    drawInnerFrame() {
        console.log('drawInnerFrame');
        console.log('this.innerFrameX', this.innerFrameX);
        console.log('this.innerFrameWidth', this.innerFrameWidth);
        console.log('this.innerFrameY', this.innerFrameY);
        console.log('this.innerFrameHeight', this.innerFrameHeight);
        this.doc.rect(this.innerFrameX, this.innerFrameY, this.innerFrameWidth, this.innerFrameHeight).stroke();
        console.log('---------');
    }

}

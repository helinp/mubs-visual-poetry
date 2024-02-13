import { poeticCircles } from './poeticCircles.js';
import { createGradientCMJN, mapRange } from './poeticUtils.js';
import { pdfSquare, pdfCircle, pdfRing, pdfHeart, pdfTriangle, pdfHexagon } from "./pdfShapes.js";


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

    constructor(text = '', orientation = 'portrait', format = 'A4') {

        super(); // appelle le constructeur de la classe mère

        this.text = text;

        this.doc = new PDFDocument({ size: 'A4', layout: 'portrait' });
        this.stream = this.doc.pipe(blobStream());

        this.width = this.doc.page.width;
        this.height = this.doc.page.height;
    }

    /**
     * Dessine dans le PDF.
     * 
     * @param {*} textDistinctChars 
     * @param {*} textOccurences 
     */
    drawer(textDistinctChars, textOccurences) {

        // background color
        this.doc.rect(0, 0, this.width, this.height).fill(this.backgroundColor);

        let radius = this.circleSizeMax
        let x = radius + (radius / 2);
        let y = x;
        let spacing = radius + this.circleSpacing;

        // mappe les occurences pour obtenir les tailles des cercles
        let mapOccurences = this.getMapOccurences(textOccurences);
        let colors = createGradientCMJN(this.startColor, this.endColor, textDistinctChars.length);
        let coords = [];

        // Pour chaque caractère dans this.text
        for (let i = 0; i < this.text.length; i++) {
            coords = this.drawLoopHandler(i, textDistinctChars, mapOccurences, colors, x, y, spacing, radius, this.doc);
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
}

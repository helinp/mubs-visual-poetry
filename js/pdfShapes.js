// Dessine un cercle
export function pdfCircle(doc, x, y, correctedRadius) {
    doc.circle(x, y, correctedRadius).fill();
}

// Dessine un carré
export function pdfSquare(doc, x, y, correctedRadius) {
    doc.rect(x - correctedRadius, y - correctedRadius, correctedRadius * 2, correctedRadius * 2).fill();
}

// Dessine un triangle
export function pdfTriangle(doc, x, y, correctedRadius) {
    let height = correctedRadius * Math.sqrt(3);
    let points = [
        [x, y - 2/3 * height], // top
        [x - correctedRadius, y + 1/3 * height], // bottom left
        [x + correctedRadius, y + 1/3 * height]  // bottom right
    ];
    doc.moveTo(...points[0])
       .lineTo(...points[1])
       .lineTo(...points[2])
       .closePath()
       .fill();
}

// Dessine un hexagone
export function pdfHexagon(doc, x, y, correctedRadius) {
    doc.moveTo(x + correctedRadius * Math.cos(0), y + correctedRadius * Math.sin(0));
    for (let side = 1; side <= 6; side++) {
        doc.lineTo(
            x + correctedRadius * Math.cos(side * 2 * Math.PI / 6),
            y + correctedRadius * Math.sin(side * 2 * Math.PI / 6)
        );
    }
    doc.closePath().fill();
}

// Dessine un coeur
export function pdfHeart(doc, x, y, correctedRadius) {
    // Adapter cette fonction pour PDFKit est complexe car PDFKit ne fournit pas de méthode directe pour les courbes de Bézier complexes comme un coeur.
    // Vous devrez peut-être dessiner le coeur en utilisant plusieurs appels `bezierCurveTo` pour simuler cette forme.
    // Cette adaptation est une simplification et pourrait nécessiter des ajustements pour ressembler à un coeur.
    console.log("La fonction de dessin de coeur nécessite une adaptation spécifique non-triviale.");

    /*
        doc
        .scale(0.6)
        .translate(470, 130)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();
        */
}

// Dessine un anneau
export function pdfRing(doc, x, y, correctedRadius) {
    // Dessine le cercle extérieur
    doc.circle(x, y, correctedRadius).stroke();
    // Dessine le cercle intérieur
    doc.circle(x, y, correctedRadius / 2).stroke();
}

/**
 * Dessine un cercle sur un contexte de canvas.
 * @param {CanvasRenderingContext2D} ctx - Le contexte de dessin sur lequel le cercle sera dessiné.
 * @param {number} x - Coordonnée X du centre du cercle.
 * @param {number} y - Coordonnée Y du centre du cercle.
 * @param {number} correctedRadius - Rayon du cercle.
 */
export function ctxMakeCircle(ctx, x, y, correctedRadius) {
    ctx.arc(x, y, correctedRadius, 0, Math.PI * 2, false);
}

/**
 * Dessine un carré sur un contexte de canvas.
 * @param {CanvasRenderingContext2D} ctx - Le contexte de dessin sur lequel le carré sera dessiné.
 * @param {number} x - Coordonnée X du centre du carré.
 * @param {number} y - Coordonnée Y du centre du carré.
 * @param {number} correctedRadius - Distance du centre aux côtés du carré.
 */
export function ctxMakeSquare(ctx, x, y, correctedRadius) {
    ctx.rect(x - correctedRadius, y - correctedRadius, correctedRadius * 2, correctedRadius * 2);
}

/**
 * Dessine un triangle sur un contexte de canvas.
 * @param {CanvasRenderingContext2D} ctx - Le contexte de dessin sur lequel le triangle sera dessiné.
 * @param {number} x - Coordonnée X du centre du triangle.
 * @param {number} y - Coordonnée Y du centre du triangle.
 * @param {number} correctedRadius - Distance du centre à chaque coin du triangle.
 */
export function ctxMakeTriangle(ctx, x, y, correctedRadius) {
    ctx.moveTo(x, y - correctedRadius);
    ctx.lineTo(x - correctedRadius, y + correctedRadius);
    ctx.lineTo(x + correctedRadius, y + correctedRadius);
    ctx.lineTo(x, y - correctedRadius);
}

/**
 * Dessine un hexagone sur un contexte de canvas.
 * @param {CanvasRenderingContext2D} ctx - Le contexte de dessin sur lequel l'hexagone sera dessiné.
 * @param {number} x - Coordonnée X du centre de l'hexagone.
 * @param {number} y - Coordonnée Y du centre de l'hexagone.
 * @param {number} correctedRadius - Rayon de l'hexagone (distance du centre à chaque coin).
 */
export function ctxMakeHexagon(ctx, x, y, correctedRadius) {
    ctx.moveTo(x + correctedRadius * Math.cos(0), y + correctedRadius * Math.sin(0));
    for (var side = 0; side < 7; side++) {
        ctx.lineTo(x + correctedRadius * Math.cos(side * 2 * Math.PI / 6), y + correctedRadius * Math.sin(side * 2 * Math.PI / 6));
    }
}

/**
 * Dessine un coeur sur un contexte de canvas.
 * @param {CanvasRenderingContext2D} ctx - Le contexte de dessin sur lequel le coeur sera dessiné.
 * @param {number} x - Coordonnée X du centre du coeur.
 * @param {number} y - Coordonnée Y du centre du coeur.
 * @param {number} correctedRadius - Rayon du coeur.
 */
export function ctxMakeHeart(ctx, x, y, correctedRadius) {
    ctx.moveTo(x, y + correctedRadius);
    ctx.bezierCurveTo(x + correctedRadius, y - correctedRadius, x + 2 * correctedRadius, y, x, y + 3 * correctedRadius);
    ctx.bezierCurveTo(x - 2 * correctedRadius, y, x - correctedRadius, y - correctedRadius, x, y + correctedRadius);
}

/**
 * Dessine un anneau sur un contexte de canvas.
 * @param {CanvasRenderingContext2D} ctx - Le contexte de dessin sur lequel l'anneau sera dessiné.
 * @param {number} x - Coordonnée X du centre de l'anneau.
 * @param {number} y - Coordonnée Y du centre de l'anneau.
 * @param {number} correctedRadius - Rayon de l'anneau.
 */
export function ctxMakeRing(ctx, x, y, correctedRadius) {
    ctx.arc(x, y, correctedRadius, 0, Math.PI * 2, false);
    ctx.arc(x, y, correctedRadius / 2, 0, Math.PI * 2, true);
}
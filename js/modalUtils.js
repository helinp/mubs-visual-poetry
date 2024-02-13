function getModalDimension(modalId, dimension) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
        console.error('Modal not found');
        throw new Error('Modal not found');
    }

    const computedStyle = window.getComputedStyle(modalElement);

    // Utiliser offsetWidth et offsetHeight pour obtenir la largeur et la hauteur totales
    let sizeWithPadding = dimension === 'width' ? modalElement.offsetWidth : modalElement.offsetHeight;

    let paddingOne, paddingTwo;
    if (dimension === 'width') {
        paddingOne = parseInt(computedStyle.paddingLeft, 10);
        paddingTwo = parseInt(computedStyle.paddingRight, 10);
    } else {
        paddingOne = parseInt(computedStyle.paddingTop, 10);
        paddingTwo = parseInt(computedStyle.paddingBottom, 10);
    }

    // Pour obtenir la dimension du contenu sans le padding, nous devons ajuster notre approche
    // Nous utilisons computedStyle.width/height qui incluent le padding, puis nous soustrayons le padding
    // Convertir computedStyle.width/height en valeur numérique pour soustraire le padding
    let computedSizeWithoutPadding;
    if (dimension === 'width') {
        computedSizeWithoutPadding = parseFloat(computedStyle.width);
    } else {
        computedSizeWithoutPadding = parseFloat(computedStyle.height);
    }

    // La valeur calculée peut être directement ajustée par le padding
    let sizeWithoutPadding = computedSizeWithoutPadding - paddingOne - paddingTwo;

    // Arrondir la valeur si nécessaire
    return Math.round(sizeWithoutPadding);
}

export function getModalWidth(modalId) {
    return getModalDimension(modalId, 'width');
}

export function getModalHeight(modalId) {
    return getModalDimension(modalId, 'height');
}

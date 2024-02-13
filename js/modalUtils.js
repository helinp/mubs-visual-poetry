export function modalHandler(modalId) {
    var elemsModal = document.querySelectorAll('.modal');
    var instancesModal = M.Modal.init(elemsModal, {
        opacity: 0.5,
        inDuration: 250,
        outDuration: 250
    });
    var modalResult = document.getElementById(modalId);
    var instanceModal = M.Modal.getInstance(modalResult);
    instanceModal.open();
}

function getModalDimension(modalId, dimension) {
    const modalElement = document.getElementById(modalId).getElementsByClassName('modal-content')[0];

    if (!modalElement) {
        console.error('Modal not found');
        throw new Error('Modal not found');
    }

    const computedStyle = window.getComputedStyle(modalElement);

    // Calcul de la dimension basée sur l'argument 'dimension'
    let sizeWithPadding = dimension === 'width' ? modalElement.offsetWidth : modalElement.offsetHeight;
    
    if(dimension === 'width') {
        var paddingOne = parseInt(computedStyle.paddingLeft, 10);
        var paddingTwo = parseInt(computedStyle.paddingRight, 10);
    } else {
        var paddingOne = parseInt(computedStyle.paddingTop, 10);
        var paddingTwo = parseInt(computedStyle.paddingBottom, 10);
    }
   
    // Calculer la dimension du contenu sans le padding
    let sizeWithoutPadding = sizeWithPadding - paddingOne - paddingTwo;

    console.log('sizeWithPadding', sizeWithPadding);
    console.log('paddingOne', paddingOne);
    console.log('paddingTwo', paddingTwo);
    // Arrondir la valeur si nécessaire
    return Math.round(sizeWithoutPadding);
}

export function getModalWidth(modalId) {
    return getModalDimension(modalId, 'width');
}

export function getModalHeight(modalId) {
    return getModalDimension(modalId, 'height');
}

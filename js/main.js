

import { poeticCirclesPdf } from "./poeticCirclesPdf.js";
import { poeticCirclesCanvas } from "./poeticCirclesCanvas.js";
import { textClass } from "./textClass.js";

document.addEventListener('DOMContentLoaded', function () {
    // set le texte par défaut
    document.getElementById('sentence').value = `abcdefghijklmnopqrstuvwxyz
Été : être pour quelques jours 
le contemporain des roses ; 
respirer ce qui flotte autour 
de leurs âmes écloses. 
    
Faire de chacune qui se meurt 
une confidente, 
et survivre à cette soeur 
en d'autres roses absente.`;

    document.getElementById('iframe-div').style.display = 'none';

});

// CANVAS
document.getElementById('generateCanvasButton').addEventListener('click', function () {

    
    let text = new textClass(document.getElementById('sentence').value);

    // Modal et taille
    var modalId = 'modal-result';

    var modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();

    var modalWidth = 760; //getModalWidth(modalId);
    var modalHeight = 200;

    // write in canvas
    let poeticCanvas = new poeticCirclesCanvas('poeticCanvas', modalWidth, modalHeight, text)

    // set options
    setOptions(poeticCanvas);

    // draw
    poeticCanvas.draw();

    
});

// PDF
document.getElementById('generatePdfButton').addEventListener('click', function () {

    let text = new textClass(document.getElementById('sentence').value);

    // write in pdf
    var poeticPdf = new poeticCirclesPdf(text);

    // set options
    setOptions(poeticPdf);

    // draw
    poeticPdf.draw();

    // show div#iframe-div
    document.getElementById('iframe-div').style.display = 'block';

});

/*
document.getElementById('useCustomGradient').addEventListener('change', function () {
    // Utilise for...of pour itérer sur la collection HTML
    for (const element of document.getElementsByClassName('color-picker')) {
        element.style.display = this.checked ? 'block' : 'none';
    }
});*/

function setOptions(poeticObject) {
    // set options
    poeticObject.setStartColor(document.getElementById('startColor').value);
    poeticObject.setEndColor(document.getElementById('endColor').value);
    poeticObject.setCircleSizeMin(document.getElementById('circleSizeMin').valueAsNumber);
    poeticObject.setCircleSizeMax(document.getElementById('circleSizeMax').valueAsNumber);
    poeticObject.setCircleSpacing(document.getElementById('circleSpacing').valueAsNumber);
    poeticObject.setCircleShape(document.getElementById('circleShape').value);
    poeticObject.setShowSpaces(document.getElementById('showSpaces').checked);
    poeticObject.setIsCapSensitive(document.getElementById('isCapSensitive').checked);
    poeticObject.setBackGroundColor(document.getElementById('backgroundColor').value);
    poeticObject.setUseLineBreaks(document.getElementById('useLineBreaks').checked);
    poeticObject.setUseCustomGradient(true);
    poeticObject.setGradientType(document.getElementById('gradientType').value);
    poeticObject.setLineSpacing(document.getElementById('lineSpacing').valueAsNumber);

    poeticObject.setInnerFrameWidth(document.getElementById('innerFrameWidth').valueAsNumber);
}
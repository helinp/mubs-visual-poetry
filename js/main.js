
import { removeSpecialChars, convertAccentedLetters } from "./poeticUtils.js";
import { poeticCirclesCanvas } from "./poeticCirclesCanvas.js";
import { poeticCirclesPdf } from "./poeticCirclesPdf.js";
import { getModalWidth, getModalHeight } from "./modalUtils.js";

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

    // hide div.color-picker on load
    for (const element of document.getElementsByClassName('color-picker')) {
        element.style.display = 'none';
    }

    document.getElementById('iframe-div').style.display = 'none';

});

// CANVAS
document.getElementById('generateCanvasButton').addEventListener('click', function () {

    // get the value of #sentence
    var sentence = document.getElementById('sentence').value;
    var cleanSentence = convertAccentedLetters(sentence);
    cleanSentence = removeSpecialChars(cleanSentence);

    // Modal et taille
    var modalId = 'modal-result';

    var modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();

    var modalWidth = 760; //getModalWidth(modalId);
    var modalHeight = 200;

    // write in canvas
    let poeticCanvas = new poeticCirclesCanvas('poeticCanvas', modalWidth, modalHeight, cleanSentence);

    // set options
    setOptions(poeticCanvas);

    // draw
    poeticCanvas.draw();
});

// PDF
document.getElementById('generatePdfButton').addEventListener('click', function () {
    // get the value of #sentence
    var sentence = document.getElementById('sentence').value;
    var cleanSentence = convertAccentedLetters(sentence);
    cleanSentence = removeSpecialChars(cleanSentence);

    // write in pdf
    var poeticPdf = new poeticCirclesPdf(cleanSentence);

    // set options
    setOptions(poeticPdf);

    // draw
    poeticPdf.draw();

    // show div#iframe-div
    document.getElementById('iframe-div').style.display = 'block';

});

document.getElementById('useCustomGradient').addEventListener('change', function () {
    // Utilise for...of pour itérer sur la collection HTML
    for (const element of document.getElementsByClassName('color-picker')) {
        element.style.display = this.checked ? 'block' : 'none';
    }
});

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
    poeticObject.setUseCustomGradient(document.getElementById('useCustomGradient').checked);
    poeticObject.setGradientType(document.getElementById('gradientType').value);
}
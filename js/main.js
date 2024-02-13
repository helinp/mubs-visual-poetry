
import { removeSpecialChars, convertAccentedLetters } from "./poeticUtils.js";
import { poeticCirclesCanvas } from "./poeticCirclesCanvas.js";
import { poeticCirclesPdf } from "./poeticCirclesPdf.js";
import { modalHandler, getModalWidth, getModalHeight} from "./modalUtils.js";

document.addEventListener('DOMContentLoaded', function() {
    // set le texte par défaut
    document.getElementById('sentence').value = `Été : être pour quelques jours 
le contemporain des roses ; 
respirer ce qui flotte autour 
de leurs âmes écloses. 
    
Faire de chacune qui se meurt 
une confidente, 
et survivre à cette soeur 
en d'autres roses absente.`;

    // resize textarea materialize
    M.textareaAutoResize(document.getElementById('sentence'));

});

// CANVAS
document.getElementById('generateCanvasButton').addEventListener('click', function() {
    
    // get the value of #sentence
    var sentence = document.getElementById('sentence').value;
    var cleanSentence = convertAccentedLetters(sentence);
    cleanSentence = removeSpecialChars(cleanSentence);

    // Modal et taille
    var modalId = 'modal-result';

    modalHandler(modalId);

    var modalWidth = getModalWidth(modalId);
    var modalHeight = getModalHeight(modalId);

    // write in canvas
    let poeticCanvas = new poeticCirclesCanvas('poeticCanvas', modalWidth, modalHeight, cleanSentence);
    
    // set options
    setOptions(poeticCanvas);

    // draw
    poeticCanvas.draw();
});

// PDF
document.getElementById('generatePdfButton').addEventListener('click', function() {
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
}
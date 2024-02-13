
import { removeSpecialChars, convertAccentedLetters } from "./poeticUtils.js";
import { poeticCircles } from "./poeticCircles.js";
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


// Lorsque le bouton "Générer" est cliqué
document.getElementById('generateButton').addEventListener('click', function() {
    
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
    let poeticCanvas = new poeticCircles('poeticCanvas', modalWidth, modalHeight, cleanSentence);
    
    // set options
    poeticCanvas.setBackGroundColor(document.getElementById('backgroundColor').value);
    poeticCanvas.setStartColor(document.getElementById('startColor').value);
    poeticCanvas.setEndColor(document.getElementById('endColor').value);
    poeticCanvas.setCircleSizeMin(document.getElementById('circleSizeMin').valueAsNumber);
    poeticCanvas.setCircleSizeMax(document.getElementById('circleSizeMax').valueAsNumber);
    poeticCanvas.setCircleSpacing(document.getElementById('circleSpacing').valueAsNumber);
    poeticCanvas.setCircleShape(document.getElementById('circleShape').value);
    poeticCanvas.setShowSpaces(document.getElementById('showSpaces').checked);
    poeticCanvas.setIsCapSensitive(document.getElementById('isCapSensitive').checked);
    
    // draw in canvas
    poeticCanvas.draw('canvas');

});



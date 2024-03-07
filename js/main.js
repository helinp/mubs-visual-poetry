

import { poeticCirclesPdf } from "./poeticCirclesPdf.js";
import { poeticCirclesCanvas } from "./poeticCirclesCanvas.js";
import { textClass } from "./textClass.js";
import { extraitTexte } from "./extraitTexte.js";
import { generateDuplicatedAlphabet } from "./textUtils.js";

document.addEventListener('DOMContentLoaded', function () {
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
    poeticObject.setIgnoreSpecialChars(document.getElementById('ignoreSpecialChars').checked);
    poeticObject.setInnerFrameWidth(document.getElementById('innerFrameWidth').valueAsNumber);
    poeticObject.setConvertAccentedLetters(document.getElementById('convertAccentedLetters').checked);
}


/**************** EXTRAITS *******************/

// Ajout d'extraits de textes
extraitTexte.ajouterExtrait('Alphabet', `abcdefghijklmnopqrstuvwxyz11`);

extraitTexte.ajouterExtrait('Alphabet dupliqué', "abcdefghijkl " + generateDuplicatedAlphabet("abcdefghijkl"));

extraitTexte.ajouterExtrait('La disparition', `Il marchait dans un haut corridor. Il y avait au mur un rayon d’acajou qui supportait
vingt‐six in‐folios. Ou plutôt, il aurait dû y avoir vingt‐six in‐folios, mais il manquait, toujours,
l’in‐folio qui offrait (qui aurait dû offrir) sur son dos l’inscription « CINQ ». Pourtant, tout
avait l’air normal : il n’y avait pas d’indication qui signalât la disparition d’un in‐folio (un
carton, « a ghost » ainsi qu’on dit à la National Library) ; il paraissait n’y avoir aucun blanc,
aucun trou vacant. Il y avait plus troublant : la disposition du total ignorait (ou pis : masquait,
dissimulait) l’omission : il fallait la parcourir jusqu’au bout pour savoir, la soustraction aidant
(vingt‐cinq dos portant subscription du « UN » au « VINGT‐SIX », soit vingt‐six moins vingt‐
cinq font un), qu’il manquait un in‐folio ; il fallait un long calcul pour voir qu’il s’agissait du
« CINQ ».`);

extraitTexte.ajouterExtrait("L'été IPA", `etˈe : ˈɛtʁ pˈuʁ kˈɛlkə ʒˈuʁ
lˈə- kɔ̃tɑ̃poʁˈɛ̃ dˈe- ʁˈoz ;
ʁɛspiʁˈe sˈə- kˈi flˈɔt otˈuʁ
dˈə- lˈœʁ ˈaːm eklˈoz.

fˈɛʁ dˈə- ʃakˈyn kˈi sˈə- mˈœʁ
ˈyn kɔ̃fidˈɑ̃t,
ˈe syʁvˈivʁ ˌaaksɑ̃ɡʁˈav sˈɛt sˈœʁ
ˈɑ̃ dˈe'ˈotʁ ʁˈoz absˈɑ̃t.`);

extraitTexte.ajouterExtrait("L'été", `Été : être pour quelques jours 
le contemporain des roses ; 
respirer ce qui flotte autour 
de leurs âmes écloses. 
    
Faire de chacune qui se meurt 
une confidente, 
et survivre à cette soeur 
en d'autres roses absente.`);

extraitTexte.ajouterExtrait("Poème turc", `Yaşamayı ciddiye alacaksın, 
yani o derecede, öylesine ki, 
mesela, kolların bağlı arkadan, sırtın duvarda, 
yahut kocaman gözlüklerin, 
beyaz gömleğinle bir laboratuvarda 
insanlar için ölebileceksin, 
hem de yüzünü bile görmediğin insanlar için, 
hem de hiç kimse seni buna zorlamamışken, 
hem de en güzel en gerçek şeyin 
yaşamak olduğunu bildiğin halde.`); 

// Préparation de l'affichage des extraits
let divExtraits = document.getElementById('choix-extraits');
let extraits = extraitTexte.obtenirExtraits();

for (let i = 0; i < extraits.length; i++) {
    let button = document.createElement('button');
    button.innerHTML = extraits[i].titre;
    button.dataset.content = extraits[i].extrait;

    button.className = 'btn btn-sm btn-outline-secondary me-2';
    button.addEventListener('click', function () {
        document.getElementById('sentence').value = this.dataset.content;
        // empeche le bouton de submitter le formulaire
        event.preventDefault();
    });

    divExtraits.appendChild(button);
}

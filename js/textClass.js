import { getAllCharsWithCounts, convertAccentedLetters, removeSpecialChars } from './textUtils.js';

export class textClass {

    constructor(text) {
        this.text = text;
        this.originalText = text;

        // nettoie le texte
        text = convertAccentedLetters(this.text);
        text = removeSpecialChars(text);

        this.setText(text);
    }

    setText(text) {
        this.charsMap = getAllCharsWithCounts(text);
        this.text = text;
    }

    getText() {
        return this.text;
    }

    getOriginalText() {
        return this.originalText;
    }

    nbChars() {
        return this.text.length;
    }

    getCharsMap() {
        return this.charsMap;
    }

    lowerCase() {
        this.text = this.text.toLowerCase();
    }

    getLength() {
        return this.text.length
    }

    getOccurencesLength() {
        return this.charsMap.length;
    }

    getDistinctChars() {
        return Object.keys(this.charsMap);
    }

    /**
     * Retourne le nombre d'occurences d'une lettre.
     * @param {string} letter 
     * @returns number
     */
    getLetterOccurences(letter) {
        return this.charsMap[letter];
    }

    /**
     * Recherche et retourne la plus petite valeur de this.charsMap[]
     */
    getSmallerOccurences() {
        // Vérifie si le tableau est vide
        if (this.charsMap.length === 0) {
            return 0;
        }
        let values = Object.values(this.charsMap);

        return Math.min(...values);
    }

    getHighestOccurences() {
        if (this.charsMap.length === 0) {
            return 0;
        }

        let values = Object.values(this.charsMap);
        return Math.max(...values);
    }

    removeSpaces() {
        let text = this.text.replace(/ /g, '');
        this.setText(text);
    }
    
    removeLineBreaks() {
        let text =  this.text.replace(/[\n\r]+/g, '');
        text =  this.text.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g,' ').replace(/^\s+|\s+$/,'')
        this.setText(text);
    }
}
import {generate} from 'random-words';
import { sentence } from 'txtgen';

const generateWords = (num : number) => {
    return new Promise<string[]>((resolve) => {
        resolve(generate(num));
    });
};

const generateNumber = (num : number) => {
    return new Promise<string[]>((resolve) => {
        resolve(new Array(num).fill(0).map(() => Math.floor(Math.random() * 9999999).toString()));
    });
};


const generateSentence = (num : number) => {
    return new Promise<string[]>((resolve) => {
        const sen = sentence().concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`)
        .concat(` ${sentence()}`);

        const char = sen.split(" ");
        resolve(new Array(num).fill(0).map((c, i) => char[i]));
    });
};

export {generateWords, generateNumber, generateSentence};
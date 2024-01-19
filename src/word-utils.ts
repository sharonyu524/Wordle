import wordBank from './word-bank.json';
// const word = getRandomWord();
export function getRandomWord(){
    const randomIndex = Math.floor(Math.random()*wordBank.length);
    return wordBank[randomIndex];
}


export enum LetterState{
    Miss = "Miss",
    Present = "Present",
    Match = "Match"
}
// console.log(word); 

// computeGuess function takes in two arguments: guess and answerString and return the result of LetterState array
export function computeGuess (
    guess: string,
    answerString: string 
): LetterState[]{
    const result: LetterState[] = [];

    if (guess.length != answerString.length){
        return result;
    }

    // turn guess and answerString into array
    const guessArray = guess.split('');  
    const answerArray = answerString.split('');
    const answerLetterCount: Record<string, number>= {}; 

    guessArray.forEach((letter, index) =>{
        const currentAnswerLetter = answerArray[index];
        // build a dictionary for answerLetterCount
        answerLetterCount[currentAnswerLetter] = answerLetterCount[currentAnswerLetter]
        ? answerLetterCount[currentAnswerLetter] + 1
        : 1; 
        
        // Basic logic for computeGuess function:
        // if the letter matches the letter in the answer, then it is a match; 
        // if the letter is in the word but does not mathc, then it is present; else, it is a miss 
        if (letter === answerArray[index]){
            result.push(LetterState.Match);
        } else if(answerArray.includes(letter)){
            result.push(LetterState.Present);
        } else{
            result.push(LetterState.Miss); 
        }
    }); 

    // the following code basically deals with edge cases 
    // create a dictionary for answerLetterCount to keep track of the occurence of each letter in the answer 
    // result is the array of LetterState 
    result.forEach((curResult, resultIndex) => { 
        if (curResult != LetterState.Present){ //present is where errors happen so if state is not present, skip to the next element 
            return;
        }

        // extract the letter from guessArray at the index of resultIndex
        const guessLetter = guessArray[resultIndex];

        answerArray.forEach((currentAnswerLetter, answerIndex) => {
            if(currentAnswerLetter !== guessLetter){
                return; 
            }
            // guess: allol, anser: colon 
            // this code is saying that the second "l" is a match, therefore the first "l" becomes a miss
            if (result[answerIndex] === LetterState.Match){
                result[resultIndex] = LetterState.Miss;
            }
            
            // if we have used up the letter, then it is a miss 
            if(answerLetterCount[guessLetter] <= 0){
                result[resultIndex] = LetterState.Miss;
            }
        });
        // decrement the letter count
        answerLetterCount[guessLetter] --; 

       
    })
    return result; 

}

export function isValidWord(word: string){
    return wordBank.includes(word);
}
    
    

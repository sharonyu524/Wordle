import {WORD_LENGTH } from "./store";
import { LetterState} from "./word-utils";

export const LETTER_LENGTH = 5;
interface WordRowProps{
    word: string;
    result?: LetterState[];
    className?: string;


}
export default function WordRow({word='', result=[],className = ''}:WordRowProps){
    // const answer = useStore(state => state.answer);
    const lettersRemaining = WORD_LENGTH -word.length;
    // split the word into an array of letters and fill in the remaining letters with empty strings 
    const letters = word.split('').concat(Array(lettersRemaining).fill(''));
   // const guessState = computeGuess(lettersProp,answer);
    return(
        // using grid so that the boxes are aligned horizontally and vertically 
        <div className={`grid grid-cols-5 gap-4 ${className}`}>
          {/* for each letter in the letters array, it generates a character box that takes in props: key, value and state */}
            {letters.map((char,index) => (
                <CharacterBox key={index} value = {char} state={result[index]}/>
            ))}
        </div>
    );
}

// passed as props to the function below 
interface CharacterBoxProps{
    value?: string;
    state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
    const stateStyles =
    state == null
      ? 'border-gray-500 text-black'
      : `${characterStateStyles[state]} text-white`;
    // console.log(state);
    return (
        <span
          className={`border-2 p-2 uppercase text-center font-extrabold text-4xl before:inline-block before:content-['_'] ${stateStyles} `}
        >
          {value}
        </span>
      );
    }
    
    const characterStateStyles = {
      [LetterState.Miss]: 'border-gray-500 bg-gray-500',
      [LetterState.Present]: 'border-yellow-500 bg-yellow-500',
      [LetterState.Match]: 'border-green-500 bg-green-500',
    };
import { useStore } from "./store";
import { LetterState} from "./word-utils";

export const LETTER_LENGTH = 5;
interface WordRowProps{
    letters: string;
    result?: LetterState[];
    className?: string;


}
export default function WordRow({letters: lettersProp = '', result=[], className = ''}:WordRowProps){
    // const answer = useStore(state => state.answer);
    const lettersRemaining = LETTER_LENGTH -lettersProp.length;
    const letters = lettersProp.split('').concat(Array(lettersRemaining).fill(''));
   // const guessState = computeGuess(lettersProp,answer);
    return(
        <div className={"grid grid-cols-5 gap-4 ${className}" }>
            {letters.map((char,index) => (
                <CharacterBox key={index} value = {char} state={result[index]}/>
            ))}
        </div>
    );
}

interface CharacterBoxProps{
    value?: string;
    state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
    const stateStyles = state == null ? '' : characterStateStyles[state];
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
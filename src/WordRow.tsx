import { useStore } from "./store";
import { LetterState, computeGuess } from "./word-utils";

export const LETTER_LENGTH = 5;
interface WordRowProps{
    letters: string;


}
export default function WordRow({letters: lettersProp = ''}:WordRowProps){
    const answer = useStore(state => state.answer);
    const lettersRemaining = LETTER_LENGTH -lettersProp.length;
    const letters = lettersProp.split('').concat(Array(lettersRemaining).fill(''));
    const guessState = computeGuess(lettersProp,answer);
    return(
        <div className="grid grid-cols-5 gap-4">
            {letters.map((char,index) => (
                <Characterbox key={index} value = {char} state={guessState[index]}/>
            ))}
        </div>
    );
}

interface CharacterboxProps{
    value: string;
    state?: LetterState;
}

function Characterbox({value,state}:CharacterboxProps){
    const stateStyles = state == null?'': characterStateStyles[state];
    // console.log(state);
    return(
        <div 
        className= {`inline-block border-2 border-gray-500 p-4 uppercase font-bold text-2xl text-center ${stateStyles}`}
        >
            {value}
        </div>
    );
}

const characterStateStyles={
    [LetterState.Miss]: "bg-gray-500",
    [LetterState.Present]: "bg-yellow-500",
    [LetterState.Match]: "bg-green-500",
}
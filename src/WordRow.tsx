const LETTER_LENGTH = 5;
interface WordRowProps{
    letters: string;


}
export default function WordRow({letters: lettersProp = ''}:WordRowProps){
    const lettersRemaining = LETTER_LENGTH -lettersProp.length;
    const letters = lettersProp.split('').concat(Array(lettersRemaining).fill(''));
    return(
        <div className="grid grid-cols-5 gap-4">
            {letters.map((char) => (
                <Characterbox key={char} value = {char} />
            ))}
        </div>
    );
}

interface CharacterboxProps{
    value: string;
}

function Characterbox({value}:CharacterboxProps){
    return(
        <div className="inline-block border-2 border-gray-500 p-4 uppercase font-bold text-2xl text-center">
            {value}
        </div>
    );
}
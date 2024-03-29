import { useStore } from "./store";
import { LetterState } from "./word-utils";

export default function Keyboard({onClick: onClickProps}:{onClick: (letter: string) => void}) {
    const keyboardLetterState =  useStore(s => s.keyboardLetterState);
    console.log(keyboardLetterState);
    const onClick =  (e: React.MouseEvent<HTMLButtonElement>) => {

        const letter = e.currentTarget.textContent;


        onClickProps(letter!);

    }
    
    return <div className= {`flex flex-col`}> 
        {KeyboardKeys.map ((keyBoardRow, rowIndex)  => {
            return (
                <div key = {rowIndex} className="my-2 flex justify-center space-x-1">
                {keyBoardRow.map((key,index) => {
                    let styles = 'rounded font-bold uppercase py-2 flex-1'
                    const letterState = keyStateStyles[keyboardLetterState[key]];
                    
                    

                    if (key === ''){
                        styles += ' pointer-events-none';
                    } else {
                        styles += ' px-1';
                      }

                    if (letterState){
                        styles += ' text-white px-1 ' + letterState;
                    } else if (key !== ''){
                        styles += ' bg-gray-400';
                    }

                    
                    return (<button onClick = {onClick} key = {key + index} className={styles}>{key}</button>);
                })}
            </div>);
       
    })}
    </div>
// Remove the unnecessary closing parenthesis
// );
}
const KeyboardKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',''],
    ['Enter','z', 'x', 'c', 'v', 'b', 'n', 'm','Backspace'],
];

const keyStateStyles = {
    [LetterState.Miss]: 'bg-gray-500',
    [LetterState.Present]: 'bg-yellow-500',
    [LetterState.Match]: 'bg-green-500',
};


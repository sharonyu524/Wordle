import { useEffect, useRef, useState } from 'react';
import {useStore, GUESS_LENGTH} from './store';
import WordRow, { LETTER_LENGTH } from './WordRow';


export default function App() {
  const state = useStore();

  const [guess,setGuess] = useGuess();



  // react on change handler 
  // const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const newGuess = e.target.value;
  //   if (newGuess.length === LETTER_LENGTH){
  //     state.addGuess(newGuess);
  //     setGuess('');
  //     return;
  //   }
  //   setGuess(newGuess);
  // };

  let rows = [...state.rows];

  if (rows.length > 0){
    rows.push({guess});
  }
  const numberOfGuessesRemaining = GUESS_LENGTH - state.rows.length; 

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));
  
  const isGameOver = state.gameState != 'playing';

  return (

      <div className="mx-auto w-96 relative">
        
        <header className='border-b border-gray-500 pb-2 mb-2'>
          <h1 className="text-4xl text-center"> Wordle </h1>
          <div>
          {/* <input type = "text" className="w-1/2 p-2 border-2 border-gray-500" 
            value = {guess}
            onChange = {onChange}
            disabled = {isGameOver}/> */}
          </div>
        </header>
       
        <main className='grid grid-rows-6 gap-4'>
        {rows.map(({guess,result},index) => (
          <WordRow key ={index} letters={guess} result = {result}/>
        ))}
        </main>

        {isGameOver && (
          <div role = "modal" className='absolute bg-white rounded border border-gray-500 text-center left-0 right-0 top-1/4 p-6w-3/4 mx-auto rounded border-gray-500 text-center'>
            Game Over! 
            <button className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto"
            onClick ={()=> {
              state.newGame();
              setGuess('');
            }}>
              New Game
            </button>
          </div>
        )}
      </div>
  );
}

function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>]{
  const addGuess = useStore(s => s.addGuess);
  const [guess,setGuess] = useState('');
  const previousGuess = usePrevious(guess);
  const onKeyDown = (e:KeyboardEvent) => {
    let letter = e.key;
    
    setGuess((currentGuess) => {
      const newGuess = letter.length === 1 ? currentGuess + letter : currentGuess;

      switch(letter){
        case 'Backspace':
          return currentGuess.slice(0,-1);
        case 'Enter':
          
          if (newGuess.length === LETTER_LENGTH){
            addGuess(newGuess);
            return '';
          }
      }

      
      if(currentGuess.length === LETTER_LENGTH){
        return currentGuess;
      }
      return newGuess;
    });
  };  
  useEffect(()=>{
    document.addEventListener('keydown',onKeyDown);
    return() =>{
      document.removeEventListener('keydown',onKeyDown);
    };
    },
  []);
  useEffect(()=>{
    if (guess.length === 0 && previousGuess?.length ===LETTER_LENGTH){
      addGuess(previousGuess);
    }
  },[guess])

  return [guess,setGuess]
}
 // use previous hook 
 function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

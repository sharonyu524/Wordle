import { useEffect, useRef, useState } from 'react';
import {useStore, GUESS_LENGTH} from './store';
import WordRow, { LETTER_LENGTH } from './WordRow';
import { isValidWord } from './word-utils';
import Keyboard from './Keyboard';



export default function App() {
  const state = useStore();

  const [guess,setGuess, addGuessLetter] = useGuess();

  const [showsInvalidGuess,setInvalidGuess] = useState(false);
  const addGuess = useStore(s => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(()=>{
    let id: any;
    if(showsInvalidGuess){
      id = setTimeout(()=>setInvalidGuess(false),2000);
    }
    return () => clearTimeout(id);
  }, [showsInvalidGuess]);
  useEffect(()=>{
    if (guess.length === 0 && previousGuess?.length ===LETTER_LENGTH){
      if(isValidWord(previousGuess)){
      addGuess(previousGuess);
      setInvalidGuess(false);

    } else{
      setInvalidGuess(true);
      setGuess(previousGuess);
    }
  }
  },[guess]);

  let rows = [...state.rows];

  let currentRow = 0;
  if (rows.length < GUESS_LENGTH){
    currentRow= rows.push({guess}) - 1;
  }
  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length; 

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));
  
  const isGameOver = state.gameState != 'playing';

  return (

      <div className="mx-auto w-96 relative">
        
        <header className='border-b border-gray-500 pb-2 mb-2'>
          <h1 className="text-4xl text-center"> Wordle </h1>

        </header>

        
       
        <main className='grid grid-rows-6 gap-4 mb-4'>
        {rows.map((word,index) => (
          <WordRow key ={index} word={word.guess} result = {word.result}
          className = {
            showsInvalidGuess && currentRow === index? 'animate-bounce' : ''
          }/>
        ))}
        </main>

        <Keyboard onClick = {letter => {
          addGuessLetter(letter);
        }}/>

        {isGameOver && (
          <div role = "modal" className='absolute bg-white rounded border border-gray-500 text-center left-0 right-0 top-1/4 p-6w-3/4 mx-auto rounded border-gray-500 text-center'>
            Game Over! 
            <WordRow word={state.answer}/>
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

function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>, (letter: string) => void]{
  
  const [guess,setGuess] = useState('');
  const addGuessLetter = (letter: string) => {
    setGuess((currentGuess) => {
      const newGuess = letter.length === 1 ? currentGuess + letter : currentGuess;
      // const addGuess = useStore(s => s.addGuess);

      switch(letter){
        case 'Backspace':
          return currentGuess.slice(0,-1);
        case 'Enter':
          
          if (newGuess.length === LETTER_LENGTH){
            // addGuess(newGuess);
            return '';
          }
      }

      
      if(newGuess.length === LETTER_LENGTH){
        return newGuess;
      }
      return newGuess;
    });
  };
  


  const onKeyDown = (e:KeyboardEvent) => {
    let letter = e.key;
    
      addGuessLetter(letter);
    };
  
 
  useEffect(()=>{
    document.addEventListener('keydown',onKeyDown);
    return() =>{
      document.removeEventListener('keydown',onKeyDown);
    };
    },
  []);


  return [guess,setGuess,addGuessLetter]
}
 // useprevious hook 
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

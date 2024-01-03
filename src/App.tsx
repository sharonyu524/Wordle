import { useState } from 'react';
import {useStore} from './store';
import WordRow, { LETTER_LENGTH } from './WordRow';

const GUESS_LENGTH = 6;
export default function App() {
  const state = useStore();

  const [guess,setGuess] = useState('');

  // react on change handler 
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;
    if (newGuess.length === LETTER_LENGTH){
      state.addGuess(newGuess);
      setGuess('');
      return;
    }
    setGuess(newGuess);
  };

  let rows = [...state.guesses];

  if (rows.length > 0){
    rows.push(guess);
  }
  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length; 
  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));
  


  return (

      <div className="mx-auto w-96">
        
        <header className='border-b border-gray-500 pb-2 mb-2'>
          <h1 className="text-4xl text-center"> Wordle </h1>
          <div>
          <input type = "text" className="w-1/2 p-2 border-2 border-gray-500" value = {guess} onChange = {(e)=>setGuess(e.target.value)}></input>
          </div>
        </header>
       
        <main className='grid grid-rows-6 gap-4'>
        {rows.map((word,index) => (
          <WordRow key ={index} letters={word}/>
        ))}
          
       

        </main>
      </div>
  )
}



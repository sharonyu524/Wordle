import { useState } from 'react';
import {useStore} from './store';
import WordRow from './WordRow';

const GUESS_LENGTH = 6;
export default function App() {
  const state = useStore();

  const [guess,setGuess] = useState('');

  const rows = [...state.guesses];

  if (rows.length > 0){
    rows.push(guess);
  }
  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length; 
  


  return (

      <div className="mx-auto w-96">
        <header className='border-b border-gray-500 pb-2 mb-2'>
          <h1 className="text-4xl text-center"> Wordle </h1>
          <div>
          <input type = "text" className="w-1/2 p-2 border-2 border-gray-500" value = {guess} onChange = {(e)=>setGuess(e.target.value)}></input>
          </div>
        </header>
       
        <main className='grid grid-rows-6 gap-4'>
          <WordRow letters="he" />
          <WordRow letters="hell"/>
          <WordRow letters="hello"/>
          <WordRow letters="solar"/>
          <WordRow letters="penny"/>
          <WordRow letters="stare"/>
       

        </main>
      </div>
  )
}



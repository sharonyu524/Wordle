import { create } from 'zustand'
import { persist} from 'zustand/middleware'
import { LetterState, computeGuess, getRandomWord } from './word-utils'
export const GUESS_LENGTH = 6;
interface GuessRow{
  guess: string;
  result?: LetterState[];
}

interface StoreState{
    answer: string;
    rows: GuessRow[];
    gameState: 'playing' | 'won' | 'lost';
    addGuess:(guess:string) => void;
    newGame: (initalGuess?: string[]) => void;
}

export const useStore = create <StoreState>()(
    persist(
      (set,get) => {
        function addGuess (guess: string) {
          const result = computeGuess(guess, get().answer);
          const didWin = result.every((letterState) => letterState === LetterState.Match);

          const rows = [...get().rows, { guess, result },];
       
         
          
          set(() => ({
            rows,
            gameState: didWin
            ? 'won' : rows.length === GUESS_LENGTH ? 'lost' : 'playing'
            
          }));
        }
        
        return {
          answer: getRandomWord(),
          rows: [],
          gameState: 'playing',
          addGuess,
          newGame: (initialRows = []) => {
            set({
              answer: getRandomWord(),
              rows: [],
              gameState: 'playing'
            });
            initialRows.forEach(addGuess);
          },
        };
      },
      
      
      {
        name: 'wordle', // name of the item in the storage (must be unique)
        
      },
    ),
  )

useStore.persist.clearStorage();
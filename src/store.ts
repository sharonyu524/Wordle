import { create } from 'zustand'
import { persist} from 'zustand/middleware'
import { LetterState, computeGuess, getRandomWord } from './word-utils'
export const GUESS_LENGTH = 6;
export const WORD_LENGTH = 5;
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
    keyboardLetterState: { [letter: string]: LetterState};
}

export const useStore = create <StoreState>()(
    persist(
      (set,get) => {
        function addGuess (guess: string) {
          const result = computeGuess(guess, get().answer);
          const didWin = result.every((letterState) => letterState === LetterState.Match);

          const rows = [...get().rows, { guess, result },];
          const keyboardLetterState = get().keyboardLetterState;
         
          result.forEach((letterState, index) => {
          const resultLetter = guess[index];

          const currentLetterState = keyboardLetterState[resultLetter];

          switch (currentLetterState) {
            
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (letterState === LetterState.Miss) {
                break;
              }
            default:
              keyboardLetterState[resultLetter] = letterState;
              break;
          }
         })
         
          
          set(() => ({
            rows,
            keyboardLetterState,
            gameState: didWin
            ? 'won' : rows.length === GUESS_LENGTH ? 'lost' : 'playing'
            
          }));
        }
        
        return {
          answer: getRandomWord(),
          rows: [],
          keyboardLetterState: {},
          gameState: 'playing',
          addGuess,
          newGame: (initialRows = []) => {
            set({
              answer: getRandomWord(),
              rows: [],
              keyboardLetterState: {},
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
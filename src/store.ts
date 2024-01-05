import { create } from 'zustand'
import { persist} from 'zustand/middleware'
import { LetterState, computeGuess, getRandomWord } from './word-utils'

interface GuessRow{
  guess: string;
  result?: LetterState[];
}

interface StoreState{
    answer: string;
    rows: GuessRow[];
    addGuess:(guess:string) => void;
    newGame: () => void;
}

export const useStore = create <StoreState>()(
    persist(
      (set) => ({
        answer: getRandomWord(),
        rows: [],
        addGuess: (guess:string) => {
           set(state => ({
            rows:[...state.rows,
            {
              guess,
              result: computeGuess(state.answer, guess),
            }
          ]
           }));
        },
        newGame: () => {
          set({
            answer: getRandomWord(),
            rows:[],
          });
        },
      }),
      {
        name: 'wordle', // name of the item in the storage (must be unique)
        
      },
    ),
  )

useStore.persist.clearStorage();
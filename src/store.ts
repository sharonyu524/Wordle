import { create } from 'zustand'
import { persist} from 'zustand/middleware'
import { getRandomWord } from './word-utils'

interface StoreState{
    answer: string;
    guesses: string[];
    addGuess:(guess:string) => void;
    newGame: () => void;
}
// export const useStore = create<StoreState>(
//   persist(
//     (set) => ({
//       answer: getRandomWord(),
//       guesses: ['hello','solar','penny'],
//       addGuess:(guess:string) => {
//         set((state)=> ({
//             guesses:[...state.guesses,guess],
//         }));
//       }),
//     }),

//     {
//       name: 'wordle', // name of the item in the storage (must be unique)
//     },
//   ),
// )

export const useStore = create <StoreState>()(
    persist(
      (set) => ({
        answer: getRandomWord(),
        guesses:['hello','penny'],
        addGuess: (guess:string) => {
           set(state => ({
            guesses:[...state.guesses,guess],
           }));
        },
        newGame: () => {
          set({
            answer: getRandomWord(),
            guesses:[],
          });
        },
      }),
      {
        name: 'wordle', // name of the item in the storage (must be unique)
        
      },
    ),
  )

useStore.persist.clearStorage();
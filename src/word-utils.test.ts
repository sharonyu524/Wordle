import { describe, expect, it} from 'vitest';
import {LetterState, computeGuess, getRandomWord, isValidWord} from './word-utils';
// import{render, screen} from './test/test-utils'

describe('word-utils', () => {
  it('random word,', () => {
    
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });

});

describe('computeGuess', () => {
    it('works with LetterState,', () => {
      
      expect(computeGuess("boost", "basic")).toEqual([
        LetterState.Match,
        LetterState.Miss,
        LetterState.Miss,
        LetterState.Present,
        LetterState.Miss
      ]);
    });

    it('works with all matched,', () => {
      
        expect(computeGuess("boost", "boost")).toEqual([
          LetterState.Match,
          LetterState.Match,
          LetterState.Match,
          LetterState.Match,
          LetterState.Match,
        ]);
      });
       
      it('works with all matched,', () => {
      
        expect(computeGuess("allol", "smelt")).toEqual([
          LetterState.Miss,
          LetterState.Present,
          LetterState.Miss,
          LetterState.Miss,
          LetterState.Miss,
        ]);
      });


  describe('isValidWord', () => {
    it('works with a valid word', () => {
      
      expect(isValidWord('boost')).toBe(true);
      expect(getRandomWord().length).toEqual(5);
    });

    it ('words with an invalid word', () => {
      expect(isValidWord('abcde')).toBe(false);
    });

  });

  
  });
  
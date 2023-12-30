import { describe, expect, it} from 'vitest';
import {LetterState, computeGuess, getRandomWord} from './word-utils';
import{render, screen} from './test/test-utils'

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
      // TODO: need to fix the algorithm when the same letter appears multiple times 
      it('works with all matched,', () => {
      
        expect(computeGuess("allol", "smelt")).toEqual([
          LetterState.Miss,
          LetterState.Present,
          LetterState.Miss,
          LetterState.Miss,
          LetterState.Miss,
        ]);
      });
  
  });
  
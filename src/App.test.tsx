import { describe, expect, test } from 'vitest';
import App from './App';
import { render, screen,userEvent} from './test/test-utils';
import { useStore } from './store';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    useStore.getState().newGame([]);
    render(<App />);
    
    expect(screen.queryByText('Game Over!')).toBeNull();
    
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    // expect(document.querySelectorAll('main')[0]?.textContent).toEqual('hello');
  });
  it('shows guesses', () => {
    useStore.getState().newGame(['hello']);
    render(<App />);
    expect(document.querySelectorAll('main')[0]?.textContent).toEqual('hello');
  });


  
  // test the ending state of the game
  it('shows game over', () => {
    useStore.getState().newGame(Array(6).fill('hello'));
    render(<App />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    userEvent.click(screen.getByText('New Game'));
  });

  // test the ending state of the game
  test('shows lost game state', () => {
    useStore.getState().newGame(Array(6).fill('hello'));
    render(<App />);
    
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });

  // test the ending state of the game
  test('show won game state', () => {
    const initialState = Array(2).fill('hello');
    useStore.getState().newGame(initialState);
    const answer = useStore.getState().answer;
    useStore.getState().addGuess(answer);

    render(<App />);

    // shows all guesses in the DOM
    expect(document.querySelector('main')?.textContent).toEqual(
      initialState.join('') + answer
    );
  
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });
});
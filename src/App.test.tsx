import { describe, expect, test } from 'vitest';
import App from './App';
import { render, screen} from './test/test-utils';
import { useStore } from './store';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    useStore.setState({ guesses: ['hello'] });
    render(<App />);
    
    expect(screen.queryByText('Game Over')).toBeNull();
    
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    // expect(document.querySelectorAll('main')[0]?.textContent).toEqual('hello');
  });
  it('shows guesses', () => {
    useStore.setState({ guesses: ['hello'] });
    
    
    render(<App />);
    expect(document.querySelectorAll('main')[0]?.textContent).toEqual('hello');
  });
  
  // test the ending state of the game
});
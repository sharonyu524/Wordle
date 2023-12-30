import { describe, expect, test } from 'vitest';
import App from './App';
import { render, screen} from './test/test-utils';

describe('Simple working test', () => {
  test('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  });

});
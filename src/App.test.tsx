import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('render App component', () => {
    render(<App />);
    expect(screen.getByText('React Forms')).toBeInTheDocument();
  });
});

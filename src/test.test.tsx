import { render, screen } from '@testing-library/react';

it('check config', () => {
  render(<button>Click me</button>);
  const btn = screen.getByRole('button');

  expect(btn).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotFound } from './NotFound';
import { MemoryRouter } from 'react-router';

describe('NotFound Component', () => {
  it('renders NotFound page content successfully', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: '404' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: "OOPS! This page doesn't exist",
      })
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Go Home' });
    expect(link).toHaveAttribute('href', '/');
  });
});

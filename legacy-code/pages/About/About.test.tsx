import { render, screen } from '@testing-library/react';
import { About } from './About';
import { describe, it, expect } from 'vitest';

describe('About Component', () => {
  it('renders about page content successfully', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'About' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Author Info' })
    ).toBeInTheDocument();

    expect(screen.getByText(/Ekaterina Volkova/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();

    const courseLink = screen.getByRole('link', {
      name: 'RS School React Course',
    });
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});

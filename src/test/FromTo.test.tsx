import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import FromTo from '../FromTo';

const noop = () => {};

beforeEach(() => {
  localStorage.clear();
});

describe('FromTo', () => {
  it('renders From and To sections with default values', () => {
    render(<FromTo onUpdateState={noop} />);
    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();
    expect(screen.getByText('Your name')).toBeInTheDocument();
    expect(screen.getByText('Company name')).toBeInTheDocument();
  });

  it('renders default email addresses', () => {
    render(<FromTo onUpdateState={noop} />);
    expect(screen.getByText('your.mail@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('company@gmail.com')).toBeInTheDocument();
  });
});

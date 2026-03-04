import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import GenerateRows from '../GenerateRows';

vi.mock('react-date-range', () => ({
  DateRange: () => <div data-testid='date-range' />,
}));

const noop = () => {};

beforeEach(() => {
  localStorage.clear();
});

describe('GenerateRows', () => {
  it('renders template input, amount input, weekends checkbox, generate button', () => {
    render(
      <GenerateRows
        hideGenerateRowsModal={noop}
        onGenerateRows={noop}
        onUpdateState={noop}
      />
    );
    expect(screen.getByDisplayValue('{{MMM d, yyyy}} - Daily work')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
  });

  it('Generate button is disabled when from === to (same day)', () => {
    render(
      <GenerateRows
        hideGenerateRowsModal={noop}
        onGenerateRows={noop}
        onUpdateState={noop}
      />
    );
    expect(screen.getByRole('button', { name: 'Generate' })).toBeDisabled();
  });
});

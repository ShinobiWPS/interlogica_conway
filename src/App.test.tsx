import { fireEvent, render, screen } from '@testing-library/react';
import { default as Board } from './App';

describe('Board', () => {
  test('renders without crashing', () => {
    render(<Board rows={50} cols={50} updateFrequency={250} />);
  });

  test('toggles cell state on click', () => {
    render(<Board rows={3} cols={3} updateFrequency={250} />);

    const firstCell = screen.getByTestId('cell-0-0');

    fireEvent.click(firstCell);

    expect(firstCell.classList.contains('alive')).toBe(true);

    fireEvent.click(firstCell);

    expect(firstCell.classList.contains('alive')).toBe(false);
  });

  test('starts and stops the game', () => {
    jest.useFakeTimers();

    render(<Board rows={3} cols={3} updateFrequency={250} />);

    const startButton = screen.getByText('Start');
    const stopButton = screen.getByText('Stop');

    fireEvent.click(startButton);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 250);

    fireEvent.click(stopButton);
    
    expect(clearInterval).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  test('resets the board', () => {
    render(<Board rows={3} cols={3} updateFrequency={250} />);

    const resetButton = screen.getByText('Reset');

    fireEvent.click(resetButton);

    const cells = screen.getAllByTestId(/cell-.*/);
    cells.forEach((cell) => {
      const isAlive = cell.classList.contains('alive');
      expect(isAlive).not.toBe(true);
    });
  });
});

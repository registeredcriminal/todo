import { render, screen } from '@testing-library/react';
import Tasks from './Tasks';
import initialTasks from './InitialTasks';

test('renders tasks table', () => {
  render(<Tasks />)

  for (var initialTask in initialTasks) {
    expect(screen.getByText(initialTasks[initialTask].title)).toBeInTheDocument();
  }
});
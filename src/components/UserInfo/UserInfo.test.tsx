import { render } from '@testing-library/react';
import { UserInfo } from './UserInfo';

describe('UserInfo component', () => {
  it('renders username initials correctly', () => {
    const { getByText } = render(<UserInfo username="Iga Sin" />);
    const initials = getByText('IS');
    expect(initials).toBeInTheDocument();
  });

  it('renders full username correctly', () => {
    const { getByText } = render(<UserInfo username="Iga Sin" />);
    const fullName = getByText('Iga Sin');
    expect(fullName).toBeInTheDocument();
  });
});

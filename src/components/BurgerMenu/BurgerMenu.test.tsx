import { render, screen, fireEvent } from '@testing-library/react';
import { BurgerMenu } from './BurgerMenu';

describe('BurgerMenu', () => {
  it('should render a button with burgerMenu icon', () => {
    render(<BurgerMenu />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    const icon = screen.getByAltText('burgerMenu');
    expect(icon).toBeInTheDocument();
  });

  it('should toggle the icon to cancel when clicked', () => {
    render(<BurgerMenu />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const icon = screen.getByAltText('cancel');
    expect(icon).toBeInTheDocument();
  });

  it('should toggle the icon back to burgerMenu when clicked again', () => {
    render(<BurgerMenu />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    const icon = screen.getByAltText('burgerMenu');
    expect(icon).toBeInTheDocument();
  });
});

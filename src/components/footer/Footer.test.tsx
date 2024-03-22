import { render } from '@testing-library/react';
import { Footer } from './Footer';
import { FOOTER_SUBTITLE, FOOTER_TITLE } from '../../constants/constants';

describe('Footer component', () => {
  test('renders footer with correct title and subtitle', () => {
    const { getByText } = render(<Footer />);

    const titleElement = getByText(FOOTER_TITLE);
    expect(titleElement).toBeInTheDocument();

    const subtitleElement = getByText(FOOTER_SUBTITLE);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders footer with correct class names', () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector('.footer');
    expect(footerElement).toBeInTheDocument();

    const wrapperElement = container.querySelector('.footer__wrapper');
    expect(wrapperElement).toBeInTheDocument();

    const textElements = container.querySelectorAll('.footer__text');
    expect(textElements.length).toBe(2);
  });
});

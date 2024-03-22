import { FC } from 'react';
import './Footer.scss';
import { FOOTER_SUBTITLE, FOOTER_TITLE } from '../../constants/constants';

export const Footer: FC = () => (
  <footer className="footer">
    <div className="footer__wrapper">
      <p className="footer__text">{FOOTER_TITLE}</p>
      <p className="footer__text">{FOOTER_SUBTITLE}</p>
    </div>
  </footer>
);

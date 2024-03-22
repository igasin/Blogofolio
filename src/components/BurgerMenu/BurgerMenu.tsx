import { FC, useState } from 'react';
import './BurgerMenu.scss';
import burgerMenu from '../../assets/icons/burgerMenu.svg';
import cancel from '../../assets/icons/cancel.svg';

interface IBurgerMenu {}

export const BurgerMenu: FC<IBurgerMenu> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button type="button" className="burgerMenu" onClick={handleClick}>
      {isOpen ? (
        <img src={cancel} alt="cancel" />
      ) : (
        <img src={burgerMenu} alt="burgerMenu" />
      )}
    </button>
  );
};

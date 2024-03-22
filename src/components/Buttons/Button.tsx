import { FC } from 'react';
import './Button.scss';

interface IButton {
  content: string;
  type: 'primary' | 'secondary' | 'secondary2';
  isDisabled: boolean;
  onClick: () => void;
}

export const Button: FC<IButton> = ({
  content, isDisabled, onClick, type,
}) => {
  const buttonClass = `button button--${type} ${isDisabled ? 'disabled' : 'active'}`;

  return (
    <button type="button" className={buttonClass} onClick={onClick} disabled={isDisabled}>
      {content}
    </button>
  );
};

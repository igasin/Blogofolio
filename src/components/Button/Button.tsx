import { FC, ReactNode } from 'react';
import './Button.scss';
import { useAppSelector } from '../../store/hooks';
import { isDarkTheme } from '../../store/theme/selectors';

interface IButton {
  isDisabled?: boolean;
  type: 'primary' | 'secondary' | 'secondary2';
  content: string | ReactNode;
  onClick?: () => void;
  isFullWidth?: boolean;
}

export const Button: FC<IButton> = ({
  content,
  isDisabled = false,
  onClick,
  type,
  isFullWidth = true,
}: IButton) => {
  const isDark = useAppSelector(isDarkTheme);

  const buttonClass = `button button--${type} ${isDisabled ? 'disabled' : 'active'} ${isDark && 'dark'} ${isFullWidth && 'full-width'}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
      type="button"
    >
      {content}
    </button>
  );
};

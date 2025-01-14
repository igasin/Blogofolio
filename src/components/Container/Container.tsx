import { FC, ReactNode } from 'react';
import './Container.scss';
import { useAppSelector } from '../../store/hooks';
import { isDarkTheme } from '../../store/theme/selectors';

interface IContainer {
  children: ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  const isDark = useAppSelector(isDarkTheme);

  return (
    <div className={`container-theme ${isDark ? 'dark' : 'light'}`}>
      <div className="container">{children}</div>
    </div>
  );
};

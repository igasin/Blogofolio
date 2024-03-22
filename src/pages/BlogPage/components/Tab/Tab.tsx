import { FC } from 'react';
import './Tab.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { isDarkTheme } from '../../../../store/theme/selectors';
import { setActiveTab } from '../../../../store/tabs/tabsSlice';

interface ITab {
  id: number;
  title: string;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const Tab: FC<ITab> = ({
  id,
  title,
  isActive = false,
  isDisabled = false,
}) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(isDarkTheme);

  const buttonClass = `tab ${isDisabled && 'disabled'} ${
    isActive && 'active'
  } ${isDark && 'dark'}`;

  const handleClick = () => {
    dispatch(setActiveTab(id));
  };

  return (
    <li className={buttonClass} onClick={handleClick}>
      {title}
    </li>
  );
};

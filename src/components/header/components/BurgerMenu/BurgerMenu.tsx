import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LightIcon,
  DarkIcon,
  CancelIcon,
  BurgerMenuIcon,
} from '../../../../assets/icons';
import './BurgerMenu.scss';
import { Button } from '../../../Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { isDarkTheme } from '../../../../store/theme/selectors';
import { toggleTheme } from '../../../../store/theme/themeSlice';
import { IconButton } from '../../../IconButton/IconButton';
import { setLogout } from '../../../../store/auth/authSlice';
import { resetUserInfoAction } from '../../../../store/userInfo/userInfoSlice';

export const BurgerMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, name: 'Home', url: './posts' },
  ]);

  const isDark = useAppSelector(isDarkTheme);
  const { isLogged } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLogged) {
      setOptions((options) => [
        ...options,
        { id: 2, name: 'Add post', url: './add-post' },
      ]);
    } else {
      setOptions((options) => options.filter((option) => option.id !== 2));
    }
  }, [isLogged]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleGoTo = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  const signIn = () => {
    navigate('/sign-in');
    setIsOpen(false);
  };

  const logout = () => {
    dispatch(setLogout());
    navigate('/sign-in');
    setIsOpen(false);
    dispatch(resetUserInfoAction());
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <div className="burgerMenu">
      <div className="burgerMenu__btn-box">
        <IconButton onClick={handleClick} type="header">
          {isOpen ? <CancelIcon /> : <BurgerMenuIcon />}
        </IconButton>
      </div>
      <div className={`burgerMenu__content ${isOpen && 'open'}`}>
        <nav className="burgerMenu__nav">
          {options.map(({ id, name, url }) => (
            <li key={id} className="burgerMenu__nav-item">
              <button
                type="button"
                className="burgerMenu__nav-btn"
                onClick={() => handleGoTo(url)}
              >
                {name}
              </button>
            </li>
          ))}
        </nav>
        <div>
          <div className="burgerMenu__theme-box">
            <button
              type="button"
              className="burgerMenu__theme-btn"
              onClick={() => dispatch(toggleTheme())}
              disabled={!isDark}
            >
              <LightIcon />
            </button>
            <button
              type="button"
              className="burgerMenu__theme-btn"
              onClick={() => dispatch(toggleTheme())}
              disabled={isDark}
            >
              <DarkIcon />
            </button>
          </div>
          {isLogged ? (
            <Button content="Log Out" onClick={logout} type="secondary" />
          ) : (
            <Button content="Sign In" onClick={signIn} type="primary" />
          )}
        </div>
      </div>
    </div>
  );
};

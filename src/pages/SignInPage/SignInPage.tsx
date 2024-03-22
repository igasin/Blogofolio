import {
  FC, useEffect, useRef, useState, KeyboardEvent,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '../../components/Typography/Typography';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { createBackToHomePath } from '../../constants/createBackToHomePath';
import { createToken } from '../../api/auth/axiosTokenOperations';
import './SignInPage.scss';
import { useAppDispatch } from '../../store/hooks';
import { setLogged } from '../../store/auth/authSlice';

interface IError {
  email: string | string[];
  password: string | string[];
  detail: string | string[];
}

export const SignInPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<IError>({
    email: '',
    password: '',
    detail: '',
  });

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEmailRef.current) {
      inputEmailRef.current.focus();
    }
  }, []);

  const handleChangeEmail = (newValue: string) => {
    setEmail(newValue);
    setErrors((prevErrors) => ({ ...prevErrors, email: '', detail: '' }));
  };

  const handleChangePassword = (newValue: string) => {
    setPassword(newValue);
    setErrors((prevErrors) => ({ ...prevErrors, password: '', detail: '' }));
  };

  const validateForm = () => {
    const newErrors: IError = {
      email: '',
      password: '',
      detail: '',
    };

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    const isValid = Object.values(newErrors).every((error) => error === '');
    if (isValid) {
      return true;
    }
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      createToken({ email, password })
        .then((data) => {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          dispatch(setLogged());
          navigate('/posts');
        })
        .catch((error) => setErrors((prev) => ({ ...prev, ...error.response.data })));
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputPasswordRef.current && email) {
      inputPasswordRef.current.focus();
    }
  };

  return (
    <div className="sign-in">
      <Breadcrumbs path={[createBackToHomePath]} />
      <Typography content="Sign In" type="H1" />
      <form className="sign-in__form">
        <Input
          title="Email"
          placeholder="Your email"
          value={email}
          handleChange={handleChangeEmail}
          inputRef={inputEmailRef}
          handleKeyUp={handleKeyUp}
          errorMessage={errors.email}
        />
        <div>
          <Input
            title="Password"
            placeholder="Your password"
            value={password}
            handleChange={handleChangePassword}
            inputRef={inputPasswordRef}
            errorMessage={errors.password}
          />
          {errors.detail && (
            <div className="sign-in__error-message">{errors.detail}</div>
          )}
        </div>
        <Button
          content="Sign In"
          onClick={handleSubmit}
          type="primary"
          isDisabled={!Object.values(errors).every((error) => error === '')}
        />
        <p className="sign-in__form-description">
          Don’t have an account?
          {' '}
          <Link to="/sign-up" className="sign-in__form-link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

import { useEffect } from 'react';
import { PageTemplate } from './components/PageTemplate/PageTemplate';
import { Router } from './routes/Router';
import { verifyAccessToken } from './api/auth/axiosTokenOperations';
import { useAppDispatch } from './store/hooks';
import { setLogged } from './store/auth/authSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      verifyAccessToken({ token }).then(() => {
        dispatch(setLogged());
      });
    }
  }, [dispatch]);

  return (
    <PageTemplate>
      <Router />
    </PageTemplate>
  );
};

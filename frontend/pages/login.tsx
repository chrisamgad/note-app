import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { loginUser } from '../store/slices/userSlice';
import { showNotification } from '../store/slices/notificationSlice';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import type { RootState, AppDispatch } from '../store';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // attempt to log in the user
      await dispatch(loginUser({ email, password })).unwrap();

      // redirect to the dashboard on success
      router.push('/dashboard');
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err || 'Login failed. Please try again.',
          type: 'error',
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.title}>
        <b>Login</b>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.loginButton}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
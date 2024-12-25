import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { registerUser } from '../store/slices/userSlice';
import { showNotification } from '../store/slices/notificationSlice';
import styles from '../styles/Register.module.css';
import type { RootState, AppDispatch } from '../store';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // attempt to register the user
      await dispatch(registerUser({ name, email, password })).unwrap();

      dispatch(
        showNotification({
          message: 'Account created successfully. You can log in with the account!',
          type: 'success',
        })
      );

    } catch (err: any) {
      dispatch(
        showNotification({
          message: err || 'Registration failed. Please try again.',
          type: 'error',
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles.title}>
        <b>Register for a new account</b>
      </div>
      <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
          <label>Full Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={styles.registerButton}
        >
          {isLoading ? 'Registering...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
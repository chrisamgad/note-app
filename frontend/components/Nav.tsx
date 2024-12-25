import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import { logoutUser } from '../store/slices/userSlice';
import { showNotification } from '../store/slices/notificationSlice';
import { useRouter } from 'next/router';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';

const Nav: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoggedIn, isLoading } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push('login');
    } catch(err: any){
      dispatch(
        showNotification({
          message: err || 'Logging out failed. Please try again.',
          type: 'error',
        })
      );
    }

  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        {isLoggedIn ? (
          // user is logged in
          <>
            <li>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          // user is not logged in
          <>
            <li>
              <Link href='/login'>Login</Link>
            </li>
            <li>
              <Link href='/register'>Create Account</Link>
            </li>
          </>
        )}
      </ul>

      {isLoggedIn ? (
        <div>
          Welcome <b>{user?.name}</b>
        </div>
      ) : null}
    </nav>
  );
};

export default Nav;
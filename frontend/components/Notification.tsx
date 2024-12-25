import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { clearNotification } from '../store/slices/notificationSlice';
import styles from '../styles/Notification.module.css';

const Notification: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { message, type, isVisible } = useSelector( (state: RootState) => state.notification );

  // clear notification on route change
  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(clearNotification());
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // cleanup the event listener
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, dispatch]);

  const handleClose = () => {
    dispatch(clearNotification());
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.notification} ${styles[type as keyof typeof styles]}`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="Close Notification"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
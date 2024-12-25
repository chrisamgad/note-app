import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { wrapper } from "../store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserProfile } from "../store/slices/userSlice";
import Notification from "../components/Notification";
import type { AppDispatch } from "../store";

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  const AppInitializer = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      // Initially attempt loading the user profile to check the isLoggedIn status for the user
      //  and accordingly set the corresponding navs to appear/hide
      dispatch(loadUserProfile());
    }, [dispatch]);

    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

  return (
    <Provider store={store}>
      <Notification />
      <AppInitializer />
    </Provider>
  );
}

export default App;

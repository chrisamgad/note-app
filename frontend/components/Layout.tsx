import styles from "../styles/Layout.module.css";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default Layout;

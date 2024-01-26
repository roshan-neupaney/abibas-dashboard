import Header from "@/app/ui/layouts/Header/header";
import Sidebar from "../ui/layouts/SideBar/sidebar";
import styles from "../ui/layouts/layout.module.css";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.header}>
        <Header />
      <div className={styles.childrenContainer} >
        <div className={styles.children}>{children}</div>
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

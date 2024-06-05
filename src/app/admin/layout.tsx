import Sidebar from "../ui/layouts/SideBar/sidebar";
import BottomMenu from "../ui/layouts/bottomBar/bottomMenu";
import styles from "../ui/layouts/layout.module.css";
import TopHeader from "@/app/ui/layouts/Header/header";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.bottomBar}>
        <BottomMenu />
      </div>
      <div className={styles.header}>
        <TopHeader />
        <div className={styles.childrenContainer}>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

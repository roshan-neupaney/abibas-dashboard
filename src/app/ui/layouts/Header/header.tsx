import styles from "./header.module.css";
import Plus from "../../../../../public/icons/add.svg";
import Arrow from "../../../../../public/icons/icon-right.svg";
import Notification from "../../../../../public/icons/nav-icon.svg";
import Image from "next/image";

const TopHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.addContainer}>
        <div className={styles.addContents}>
          <Image src={Plus} width={20} height={20} alt="" />
          <span className={styles.text}>Add</span>
        </div>
        <div className={styles.arrow}>
          <Image src={Arrow} width={20} height={20} alt="" />
        </div>
      </div>
      <div className={styles.contentRight}>
        <div className={styles.logoBox}>
          <Image src={Notification} width={20} height={20} alt="" />
        </div>
        <div className={styles.profileBox}>
          <span className={styles.profileName}>RN</span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

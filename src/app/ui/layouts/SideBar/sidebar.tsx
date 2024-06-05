import React from "react";
import styles from "./sidebar.module.css";
import Image from "next/image";
import SawariIcon from "../../../../../public/icons/Group.svg";
import MenuLink from "./menuLink/menuLink";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoName}>
        <Image src={SawariIcon} width={98} height={24} alt="" />
      </div>
        <MenuLink />
    </div>
  );
};

export default Sidebar;

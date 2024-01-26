import React from "react";
// import SidebarMenu from "./SidebarMenu/sidebarMenu";
import styles from "./sidebar.module.css";
import Image from "next/image";
import SawariIcon from "../../../../../public/icons/Group.svg";
import Link from "next/link";
import MenuLink from "./menuLink/menuLink";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoName}>
        <Image src={SawariIcon} width={98} height={24} alt="" />
      </div>
      {/* <div className={styles.sidebarMenu}> */}
        <MenuLink />
      {/* </div> */}
      
    </div>
  );
};

export default Sidebar;

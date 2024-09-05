"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./menuLink.module.css";
import DashboardIcon from "../../../../../../public/icons/dashboard.svg";
import ShoeIcon from "../../../../../../public/icons/shoesIcon.svg";
import Circle from "../../../../../../public/icons/circle.svg";
import UserGroup from "../../../../../../public/icons/user-group.svg";
import Arrow from "../../../../../../public/icons/icon-right.svg";
import Feedback from "../../../../../../public/icons/feedback.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Form from "../../../../../../public/icons/form.svg";
// import Target from "../../../../../../public/icons/target.svg";
// import Quote from "../../../../../../public/icons/clipboard-quote.svg";
// import Blog from "../../../../../../public/icons/blog.svg";
// import Graph from "../../../../../../public/icons/graph-bar.svg";
// import AppManagement from "../../../../../../public/icons/app-management.svg";
// import Setting from "../../../../../../public/icons/setting.svg";
// import News from "../../../../../../public/icons/news.svg";

const mainMenu = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Products",
    category: [
      { title: "Inventory", link: "/admin/inventory", icon: Circle },
    ],
    icon: ShoeIcon,
  },
  {
    title: "Users",
    link: "/admin/users",
    icon: UserGroup,
  },
  {
    title: "Form",
    category: [
      { title: "Category", link: "/admin/form/category", icon: Circle },
      { title: "Brand", link: "/admin/form/brand", icon: Circle },
    ],
    icon: Form,
  },
];

const MenuLink = () => {
  const [openCategory, toggleCategory] = useState("");

  const handleToggle = (val: string) => {
    if (val !== openCategory) {
      toggleCategory(val);
    } else {
      toggleCategory("");
    }
  };

  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {mainMenu.map((items, index) => {
          return (
            <div key={`parent-${index}`}>
              {items?.category ? (
                <>
                  <div
                    className={`${styles.linkContainer} ${
                      openCategory === items.title && styles.openContainer
                    }`}
                    onClick={() => handleToggle(items.title)}
                    key={`${index}-${items.title}`}
                  >
                    <div className={styles.subContainer}>
                      <Image src={items.icon} width={20} height={20} alt="" />
                      <span className={styles.title}>{items.title}</span>
                    </div>
                    <Image
                      className={`${
                        openCategory === items.title
                          ? styles.arrowUp
                          : styles.arrowDown
                      }`}
                      src={Arrow}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  <div
                    className={`${
                      openCategory === items.title
                        ? styles.showDropdown
                        : styles.hideDropdown
                    }`}
                  >
                    {items.category.map((cat, i) => {
                      // toggleCategory(pathname.includes(cat.link) ? items?.title: '')
                      return (
                        <Link href={cat.link} key={`child-${i}-${cat.title}`}>
                          <div
                            className={`${styles.linkContainer} ${
                              pathname.includes(cat.link) ? styles.active : ""
                            }`}
                          >
                            <div className={styles.subContainer}>
                              <Image
                                src={cat.icon}
                                width={20}
                                height={20}
                                alt=""
                              />
                              <span className={styles.title}>{cat.title}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <Link href={items.link} key={`child-${index}-${items.title}`}>
                  <div
                    className={`${styles.linkContainer} ${
                      pathname.includes(items.link) ? styles.active : ""
                    }`}
                  >
                    <div className={styles.subContainer}>
                      <Image src={items.icon} width={20} height={20} alt="" />
                      <span className={styles.title}>{items.title}</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
        {/* <div style={{borderBottom: '1px solid #2e3132'}}></div>
        <div className={`${
                      openCategory === items.title
                        ? styles.showDropdown
                        : styles.hideDropdown
                    }`}>
        {FormMenu.map((form, index) => {
          return (
            <Link href={form.link} key={`child-${index}-${form.title}`}>
              <div
                className={`${styles.linkContainer} ${
                  pathname.includes(form.link) ? styles.active : ""
                }`}
              >
                <div className={styles.subContainer}>
                  <Image src={form.icon} width={20} height={20} alt="" />
                  <span className={styles.title}>{form.title}</span>
                </div>
              </div>
            </Link>
          );
        })}
        </div> */}
      </div>
      <Link href="/admin/dashboard">
        <div className={styles.feedbackContainer}>
          <Image src={Feedback} width={20} height={20} alt="" />
          <span>Feedback</span>
        </div>
      </Link>
    </div>
  );
};

export default MenuLink;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./menuLink.module.css";
import DashboardIcon from "../../../../../../public/icons/dashboard.svg";
import Car from "../../../../../../public/icons/car.svg";
import Circle from "../../../../../../public/icons/circle.svg";
import Target from "../../../../../../public/icons/target.svg";
import Quote from "../../../../../../public/icons/clipboard-quote.svg";
import UserGroup from "../../../../../../public/icons/user-group.svg";
import Blog from "../../../../../../public/icons/blog.svg";
import Graph from "../../../../../../public/icons/graph-bar.svg";
import AppManagement from "../../../../../../public/icons/app-management.svg";
import Setting from "../../../../../../public/icons/setting.svg";
import Arrow from "../../../../../../public/icons/icon-right.svg";
import Feedback from "../../../../../../public/icons/feedback.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
      { title: "Catalogue", link: "/admin/catalogue", icon: Circle },
    ],
    icon: Car,
  },
  {
    title: "Leads",
    category: [
      { title: "Bookings", link: "/admin/bookings", icon: Circle },
      { title: "Test Drives", link: "/admin/test-drives", icon: Circle },
      { title: "Offers", link: "/admin/offers", icon: Circle },
    ],
    icon: Target,
  },
  {
    title: "Quote Review",
    link: "/admin/quote-review",
    icon: Quote,
  },
  {
    title: "Customers",
    link: "/admin/customers",
    icon: UserGroup,
  },
  {
    title: "Agents",
    link: "/admin/agents",
    icon: UserGroup,
  },
  { title: "Blogs", link: "/admin/blogs", icon: Blog },
  {
    title: "Report & Analysis",
    link: "/admin/report",
    icon: Graph,
  },
  {
    title: "App Management",
    link: "/admin/app-management",
    icon: AppManagement,
  },
  { title: "Settings", link: "/admin/settings", icon: Setting },
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
    <div className={styles.container}>
      <div>
        {mainMenu.map((items, index) => {
          return (
            <React.Fragment key={`parent-${index}`}>
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
            </React.Fragment>
          );
        })}
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

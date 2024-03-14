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
import Form from "../../../../../../public/icons/form.svg";
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
  {
    title: "Forms",
    category: [
      {
        title: "Category",
        link: "/admin/form/category",
        icon: Circle,
      },
      {
        title: "Body Type",
        link: "/admin/form/body-type",
        icon: Circle,
      },
      {
        title: "Brand",
        link: "/admin/form/brand",
        icon: Circle,
      },
      {
        title: "Model",
        link: "/admin/form/model",
        icon: Circle,
      },
      {
        title: "Color For Choice",
        link: "/admin/form/color",
        icon: Circle,
      },
      {
        title: "Variant",
        link: "/admin/form/variant",
        icon: Circle,
      },
      {
        title: "Unit",
        link: "/admin/form/unit",
        icon: Circle,
      },
      {
        title: "Specification Category",
        link: "/admin/form/specification-category",
        icon: Circle,
      },
      {
        title: "Assets Part Category",
        link: "/admin/form/assets-part-category",
        icon: Circle,
      },
      {
        title: "Assets Parts",
        link: "/admin/form/assets-parts",
        icon: Circle,
      },
      {
        title: "Inspection Category",
        link: "/admin/form/inspection-category",
        icon: Circle,
      },
      {
        title: "Inspections",
        link: "/admin/form/inspections",
        icon: Circle,
      },
      {
        title: "Feature Category",
        link: "/admin/form/feature-category",
        icon: Circle,
      },
      {
        title: "Specifications",
        link: "/admin/form/specifications",
        icon: Circle,
      },
      {
        title: "Features",
        link: "/admin/form/features",
        icon: Circle,
      },
      {
        title: "Slider",
        link: "/admin/form/slider",
        icon: Circle,
      },
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
    <div className={styles.container}>
      <div className={styles.menuContainer}>
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

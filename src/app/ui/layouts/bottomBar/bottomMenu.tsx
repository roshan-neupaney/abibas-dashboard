import React from "react";
import DashboardIcon from "../../../../../public/icons/dashboard.svg";
import Car from "../../../../../public/icons/car.svg";
import addIcon from "../../../../../public/icons/icon-left-white.svg";
import Graph from "../../../../../public/icons/graph-bar.svg";
import UserIcon from "../../../../../public/icons/user-circle.svg";
import Image from "next/image";
import Link from "next/link";

const mainMenu = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Inventory",
    link: "/admin/inventory",
    icon: Car,
  },
  {
    title: "Add Product",
    link: "/admin/inventory/add",
    icon: addIcon,
  },
  {
    title: "Report",
    link: "/admin/report",
    icon: Graph,
  },
  {
    title: "Account",
    link: "/admin/customers",
    icon: UserIcon,
  },
];

const BottomMenu = () => {
  return (
    <div className="flex w-full">
      {mainMenu.map((items: any, index: number) => {
        return (
          <Link href={items.link} key={index}
          className="flex flex-1 justify-center" >
          
            <div className="flex flex-col px-4 py-[18px] justify-center items-center gap-1">
              <span>
                <Image src={items.icon} width={20} height={20} alt="" />
              </span>
              <span className="body-medium-NH" style={{ color: "#ffffff" }}>
                {items.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomMenu;

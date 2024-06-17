import Sidebar from "../ui/layouts/SideBar/sidebar";
import BottomMenu from "../ui/layouts/bottomBar/bottomMenu";
import TopHeader from "@/app/ui/layouts/Header/header";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex w-screen min-h-screen flex-col lg:flex-row">
      <div className="lg:min-w-56 h-screen sticky top-0 left-0 overflow-auto noScrollBar hidden lg:flex z-50">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col w-full lg:w-[calc(100%-300px)] ">
        <TopHeader />
        <div className="bg-[#f9f7f7] h-full w-full flex-1 mb-[80px] lg:mb-0">
          <div className="flex flex-col lg:mx-10 mx-5 pt-4 pb-3 gap-5">
            {children}
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 flex z-50 bg-[#1a1c1e] w-full">
        <BottomMenu />
      </div>
    </div>
  );
};

export default DashboardLayout;

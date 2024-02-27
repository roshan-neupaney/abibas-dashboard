// "use client";
import PageHeader from "../../../../components/pageHeader";
import { cookies } from "next/headers";


const Dashboard = () => {
// console.log('cookies', cookies().get('roshan')?.value)

  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="container gap-4 p-4">
        {/* <NoDataFound /> */}
        {/* <CircularLoader/> */}
      </div>
    </>
  );
};

export default Dashboard;

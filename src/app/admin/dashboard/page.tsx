// "use client";
// import { useEffect } from "react";
import CarLoader from "../../../../components/loader/carLoader";
import PageHeader from "../../../../components/pageHeader";
import { authorization } from "../../../../hoc/auth";
import { cookies } from "next/headers";


const Dashboard = () => {
const token = cookies().get('access_token')?.value;
    authorization(token);
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="container gap-4 p-4">
      {/* <CarLoader /> */}
      </div>
    </>
  );
};

export default Dashboard;

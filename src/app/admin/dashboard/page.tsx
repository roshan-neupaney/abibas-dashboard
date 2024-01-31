"use client";
import CustomInput from "../../../../components/input";
import PageHeader from "../../../../components/pageHeader";
import { useState } from "react";
import { updateState } from "../../../../utilities/helper";
import CustomSelect from "../../../../components/CustomSelect";

const Dashboard = () => {
  // const [formData, setFormData] = useState({ title: "" });
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="body-container"></div>
    </>
  );
};

export default Dashboard;

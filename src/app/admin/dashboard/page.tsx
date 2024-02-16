"use client";
import CustomInput from "../../../../components/input";
import PageHeader from "../../../../components/pageHeader";
import { useState } from "react";
import { updateState } from "../../../../utilities/helper";
import CustomSelect from "../../../../components/select";
import { CustomToggleSwitch } from "../../../../components/checkbox";
import { CustomRadio } from "../../../../components/radio";
import CustomDropzone from "../../../../components/dropzone";
import LazyImage from "../../../../components/lazyImage";
import {CircularLoader} from "../../../../components/loader/loader";
import NoDataFound from "../../../../components/noDataFound";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    checked: true,
    radio: "",
  });

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

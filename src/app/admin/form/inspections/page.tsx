import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_INSPECTIONS } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import Inspection from "./childPage";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_INSPECTIONS);
    return res?.data;
  } catch(e) {
  }
}
export const metadata: Metadata = {
  title: 'Inspections'
}


const InspectionCategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Inspections" addRoute="/admin/form/inspections/add" />
        <Inspection _data={data} {...{token}} />
    </>
  );
};

export default InspectionCategoryPage;

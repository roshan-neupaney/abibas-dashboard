import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_INSPECTION_CATEGORY } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import InspectionCategory from "./childPage";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_INSPECTION_CATEGORY);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Inspection Category'
}

const InspectionCategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Inspection Category" addRoute="/admin/form/inspection-category/add" />
        <InspectionCategory _data={data} {...{token}} />
    </>
  );
};

export default InspectionCategoryPage;

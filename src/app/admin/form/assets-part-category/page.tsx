import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_ASSETS_PART_CATEGORY } from "../../../../../config/endPoints";
import Category from "./childPage";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_ASSETS_PART_CATEGORY);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Assets Part Category'
}

const AssetsPartCategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Assets Part Category" addRoute="/admin/form/assets-part-category/add" />
        <Category _data={data} {...{token}} />
    </>
  );
};

export default AssetsPartCategoryPage;

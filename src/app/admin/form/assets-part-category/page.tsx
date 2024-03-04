import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet, ServerSideGetWithParams } from "../../../../../utilities/apiCall";
import { CRUD_ASSETS_PART_CATEGORY, CRUD_CATEGORY, CRUD_SPECIFICATION_CATEGORY } from "../../../../../config/endPoints";
import Category from "./childPage";
import { authorization } from "../../../../../hoc/auth";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_ASSETS_PART_CATEGORY);
    return res?.data;
  } catch(e) {
  }
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

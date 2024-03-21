import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_CATEGORY } from "../../../../../config/endPoints";
import Category from "./childPage";
import { authorization } from "../../../../../hoc/auth";

async function getData(token: any) {
  authorization(token, '/admin/form/category');
  try{
    const res = await ServerSideGet(token, CRUD_CATEGORY);
    return res?.data;
  } catch(e) {
  }
}

const CategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Category" addRoute="/admin/form/category/add" />
        <Category _data={data} {...{token}} />
    </>
  );
};

export default CategoryPage;

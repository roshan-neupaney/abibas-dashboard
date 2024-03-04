import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet, ServerSideGetWithParams } from "../../../../../utilities/apiCall";
import { CRUD_CATEGORY, CRUD_SPECIFICATION_CATEGORY } from "../../../../../config/endPoints";
import Category from "./childPage";
import { authorization } from "../../../../../hoc/auth";
import SpecificationCategory from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_SPECIFICATION_CATEGORY);
    return res?.data;
  } catch(e) {
  }
}

const CategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Specification Category" addRoute="/admin/form/specification-category/add" />
        <SpecificationCategory _data={data} {...{token}} />
    </>
  );
};

export default CategoryPage;

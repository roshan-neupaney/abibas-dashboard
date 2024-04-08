import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_COLOR_CHOICE, CRUD_UNIT } from "../../../../../config/endPoints";
import Category from "./childPage";
import { authorization } from "../../../../../hoc/auth";
import Unit from "./childPage";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_UNIT);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Unit'
}

const CategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Unit" addRoute="/admin/form/unit/add" />
        <Unit _data={data} {...{token}} />
    </>
  );
};

export default CategoryPage;

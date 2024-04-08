import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_COLOR_CHOICE } from "../../../../../config/endPoints";
import Category from "./childPage";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token, '/admin/form/color');
  try{
    const res = await ServerSideGet(token, CRUD_COLOR_CHOICE);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Color For Choice'
}

const CategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Color For Choice" addRoute="/admin/form/color/add" />
        <Category _data={data} {...{token}} />
    </>
  );
};

export default CategoryPage;

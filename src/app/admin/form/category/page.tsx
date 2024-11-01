import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_CATEGORY } from "../../../../../config/endPoints";
import Category from "./childPage";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try {
    const res = [await ServerSideGet(token, CRUD_CATEGORY)];
    const [category] = res;
    return {category};
  } catch (e) {
    console.error(e);
  }
}

export const metadata: Metadata = {
  title: "Category",
};

const CategoryPage = async () => {
  const token = cookies().get("access_token")?.value || "";
  const {category}: any = await getData(token);

  return (
    <>
      <PageHeader title="Category" addRoute="/admin/form/category/add" />
      <Category category={category.data} token={token} />
    </>
  );
};

export default CategoryPage;

import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_BODY_TYPE } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import BodyType from "./childPage";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_BODY_TYPE);
    revalidatePath('/admin/form/body-type');
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Body Type'
}

const CategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Body Type" addRoute="/admin/form/body-type/add" />
        <BodyType _data={data} token={token} />
    </>
  );
};

export default CategoryPage;

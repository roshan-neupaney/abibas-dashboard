import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_BRAND } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import Brand from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_BRAND);
    return res?.data;
  } catch(e) {
  }
}

const BrandPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Brand" addRoute="/admin/form/brand/add" />
        <Brand _data={data} token={token} />
    </>
  );
};

export default BrandPage;

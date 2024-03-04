import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_MODEL } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import Model from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_MODEL);
    return res?.data;
  } catch(e) {
  }
}

const BrandPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Model" addRoute="/admin/form/model/add" />
        <Model _data={data} token={token} />
    </>
  );
};

export default BrandPage;

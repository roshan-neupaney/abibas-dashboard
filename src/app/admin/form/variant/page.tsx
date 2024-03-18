import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_VARIANT } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import Variant from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_VARIANT);
    return res?.data;
  } catch(e) {
  }
}

const VariantPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Variant" addRoute="/admin/form/variant/add" />
        <Variant _data={data} token={token} />
    </>
  );
};

export default VariantPage;

import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_SPECIFICATION } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import Feature from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_SPECIFICATION);
    return res?.data;
  } catch(e) {
  }
}

const SpecificationsPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Specifications" addRoute="/admin/form/specifications/add" />
        <Feature _data={data} {...{token}} />
    </>
  );
};

export default SpecificationsPage;

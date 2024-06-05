import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_SPECIFICATION } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";
import Specifications from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_SPECIFICATION);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Specification'
}

const SpecificationsPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Specifications" addRoute="/admin/form/specifications/add" />
        <Specifications _data={data} {...{token}} />
    </>
  );
};

export default SpecificationsPage;

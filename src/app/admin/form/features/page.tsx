import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_FEATURE } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import Feature from "./childPage";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_FEATURE);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Features'
}

const FeatureCategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Features" addRoute="/admin/form/features/add" />
        <Feature _data={data} {...{token}} />
    </>
  );
};

export default FeatureCategoryPage;

import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_FEATURE_CATEGORY } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import FeatureCategory from "./childPage";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token, '/admin/form/feature-category');
  try{
    const res = await ServerSideGet(token, CRUD_FEATURE_CATEGORY);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Feature Category'
}

const FeatureCategoryPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Feature Category" addRoute="/admin/form/feature-category/add" />
        <FeatureCategory _data={data} {...{token}} />
    </>
  );
};

export default FeatureCategoryPage;

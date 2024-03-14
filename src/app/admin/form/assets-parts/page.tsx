import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_ASSETS_PARTS } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import AssetsPart from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_ASSETS_PARTS);
    return res?.data;
  } catch(e) {
  }
}

const AssetsPartPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Assets Parts" addRoute="/admin/form/assets-parts/add" />
        <AssetsPart _data={data} {...{token}} />
    </>
  );
};

export default AssetsPartPage;

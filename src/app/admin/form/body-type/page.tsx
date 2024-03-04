import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_BODY_TYPE } from "../../../../../config/endPoints";
import { beautifyBodyType, beautifyCategory } from "../../../../../utilities/beautify";
import { authorization } from "../../../../../hoc/auth";
import BodyType from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_BODY_TYPE);
    return res?.data;
  } catch(e) {
  }
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

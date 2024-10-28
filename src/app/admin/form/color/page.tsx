import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_COLOR } from "../../../../../config/endPoints";
import Color from "./childPage";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_COLOR);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Color'
}

const ColorPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Color" addRoute="/admin/form/color/add" />
        <Color _data={data} {...{token}} />
    </>
  );
};

export default ColorPage;

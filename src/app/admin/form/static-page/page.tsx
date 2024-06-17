import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_STATIC_PAGE } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";
import Static from "./childPage";

async function getData(token: any) {
  authorization(token);
  try {
    const res = await ServerSideGet(token, CRUD_STATIC_PAGE);
    return res?.data;
  } catch (e) {}
}

export const metadata: Metadata = {
  title: "Static Page",
};

const StaticPage = async () => {
  const token = cookies().get("access_token")?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Static" addRoute="/admin/form/static-page/add" />
      <Static _data={data} {...{ token }} />
    </>
  );
};

export default StaticPage;

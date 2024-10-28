import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_ENUM } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";
import Enums from "./childPage";

async function getData(token: any) {
  authorization(token);
  try {
    const res = await ServerSideGet(token, CRUD_ENUM);
    return res?.data;
  } catch (e) {}
}

export const metadata: Metadata = {
  title: "Enums",
};

const EnumsPage = async () => {
  const token = cookies().get("access_token")?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Enums" addRoute="/admin/form/enums/add" />
      <Enums _data={data} {...{ token }} />
    </>
  );
};

export default EnumsPage;

import { Metadata } from "next";
import PageHeader from "../../../../components/pageHeader";
import { CRUD_SHOE } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import { ServerSideGet, ServerSideGetWithParams } from "../../../../utilities/apiCall";
import Inventory from "./inventory";
import { cookies } from "next/headers";

interface searchParamsType {
  color: string;
  category: string;
}

async function getData(token: string, searchParams: searchParamsType) {
  authorization(token);
  const {color} = searchParams;
  try {
    const res = [await ServerSideGetWithParams(token, CRUD_SHOE, ``)];
    const [shoeList] = res;
    return { shoeList };
  } catch (e) {}
}

export const metadata: Metadata = {
  title: "Inventory",
};

const InventoryPage = async ({searchParams}: {searchParams: searchParamsType}) => {

  const token = cookies().get("access_token")?.value || "";
  const { shoeList }: any = await getData(token, searchParams);
  return (
    <>
      <PageHeader title="Inventory" addRoute="/admin/inventory/add" />
      <Inventory {...{ shoeList, token }} />
    </>
  );
};

export default InventoryPage;

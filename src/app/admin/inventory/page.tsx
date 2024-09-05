import { Metadata } from "next";
import PageHeader from "../../../../components/pageHeader";
import { CRUD_SHOE, CRUD_VEHICLE_ENUM } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import { ServerSideGet } from "../../../../utilities/apiCall";
import Inventory from "./inventory";
import { cookies } from "next/headers";

async function getData(token: string) {
  authorization(token);
  try {
    const res = [await ServerSideGet(token, CRUD_SHOE)];
    const [shoeList] = res;
    return { shoeList };
  } catch (e) {}
}

export const metadata: Metadata = {
  title: "Inventory",
};

const InventoryPage = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { shoeList }: any = await getData(token);
  return (
    <>
      <PageHeader title="Inventory" addRoute="/admin/inventory/add" />
      <Inventory {...{ shoeList, token }} />
    </>
  );
};

export default InventoryPage;

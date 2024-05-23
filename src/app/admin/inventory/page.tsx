import { Metadata } from "next";
import PageHeader from "../../../../components/pageHeader";
import { CRUD_VEHICLE, CRUD_VEHICLE_ENUM } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import { ServerSideGet } from "../../../../utilities/apiCall";
import Inventory from "./inventory";
import { cookies } from "next/headers";

async function getData(token: string) {
  authorization(token);
  try {
    const res = [
      await ServerSideGet(token, CRUD_VEHICLE),
      await ServerSideGet(token, CRUD_VEHICLE_ENUM),
    ];
    const [vehicleList, vehicle_enums] = res;
    return { vehicleList, vehicle_enums };
  } catch (e) {}
}

export const metadata: Metadata = {
  title: "Variant",
};

const InventoryPage = async () => {
  const token = cookies().get("access_token")?.value || "";
  const { vehicleList, vehicle_enums }: any = await getData(token);
  return (
    <>
      <PageHeader title="Inventory" addRoute="/admin/inventory/add" />
      <Inventory {...{ vehicleList, vehicle_enums }} />
    </>
  );
};

export default InventoryPage;

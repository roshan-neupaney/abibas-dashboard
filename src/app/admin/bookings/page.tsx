import { cookies } from "next/headers";
import PageHeader from "../../../../components/pageHeader";
import { CRUD_CATEGORY } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import { ServerSideGetWithParams } from "../../../../utilities/apiCall";
import Bookings from "./bookings";

async function getData(token: any, page: string, pageSize: string) {
  try {
    authorization();
    const res = await ServerSideGetWithParams(
      token,
      CRUD_CATEGORY,
      `page=${page}&pageSize=${pageSize}`
    );
    return res?.data;
  } catch (e) {}
}

const InventoryPage = (props: any) => {
  const access_tokens = cookies().get("access_token");

  const { searchParams } = props;
  const page = searchParams?.page || 1;
  const pageSize = searchParams?.pageSize || 10;
  const data = getData(
    access_tokens?.value,
    page,
    pageSize
  );
  return (
    <>
      <PageHeader title="Bookings" addRoute="/admin/bookings/add" />
      <Bookings />
    </>
  );
};

export default InventoryPage;

import { cookies } from "next/headers";
import PageHeader from "../../../../components/pageHeader";
import { GET_ALL_BOOKED_LIST } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import { ServerSideGetWithParams } from "../../../../utilities/apiCall";
import Bookings from "./bookings";

async function getData(token: any, page: string, pageSize: string) {
  authorization(token);
  try {
    const res = [
      await ServerSideGetWithParams(
        token,
        GET_ALL_BOOKED_LIST,
        `page=${page}&pageSize=${pageSize}`
      ),
    ];
    const [bookingList] = res;
    return { bookingList };
  } catch (e) {}
}

const AllBookedPage = async (props: any) => {
  const token = cookies().get("access_token")?.value || "";
  const { searchParams } = props;
  const page = searchParams?.page || 1;
  const pageSize = searchParams?.pageSize || 10;
  const { bookingList }: any = await getData(token, page, pageSize);
  return (
    <>
      <PageHeader title="Bookings" addRoute="/admin/bookings/add" />
      <Bookings bookingList={bookingList.data} />
    </>
  );
};

export default AllBookedPage;

import { cookies } from "next/headers";
import PageHeader from "../../../../components/pageHeader";
import { GET_ALL_OFFER_LIST } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import { ServerSideGetWithParams } from "../../../../utilities/apiCall";
import Offers from "./offers";

async function getData(token: any, page: string, pageSize: string) {
  authorization(token);
  try {
    const res = [
      await ServerSideGetWithParams(
        token,
        GET_ALL_OFFER_LIST,
        `page=${page}&pageSize=${pageSize}`
      ),
    ];
    const [offerList] = res;
    return { offerList };
  } catch (e) {}
}

const AllOffersPage = async (props: any) => {
  const token = cookies().get("access_token")?.value || "";
  const { searchParams } = props;
  const page = searchParams?.page || 1;
  const pageSize = searchParams?.pageSize || 10;
  const { offerList }: any = await getData(token, page, pageSize);
  return (
    <>
      <PageHeader title="Offers" addRoute="/admin/offers/add" />
      <Offers offerList={offerList.data} />
    </>
  );
};

export default AllOffersPage;

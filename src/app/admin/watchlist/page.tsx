import { cookies } from "next/headers";
import PageHeader from "../../../../components/pageHeader";
import {
  GET_ALL_WATCH_LIST,
} from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import {
  ServerSideGetWithParams,
} from "../../../../utilities/apiCall";
import WatchLists from "./watchList";

async function getData(token: any, page: string, pageSize: string) {
  authorization(token);
  try {
    const res = [
      await ServerSideGetWithParams(
        token,
        GET_ALL_WATCH_LIST,
        `page=${page}&pageSize=${pageSize}`
      ),
    ];
    const [watchList] = res;
    return { watchList };
  } catch (e) {}
}

const AllWatchListPage = async (props: any) => {
  const token = cookies().get("access_token")?.value || "";
  const { searchParams } = props;
  const page = searchParams?.page || 1;
  const pageSize = searchParams?.pageSize || 10;
  const { watchList }: any = await getData(token, page, pageSize);
  return (
    <>
      <PageHeader title="WatchLists" addRoute="/admin/watchlist/add" />
      <WatchLists watchList={watchList.data} />
    </>
  );
};

export default AllWatchListPage;

import { cookies } from "next/headers";
import PageHeader from "../../../../components/pageHeader";
import { GET_ALL_TEST_DRIVE_LIST } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import { ServerSideGetWithParams } from "../../../../utilities/apiCall";
import TestDrives from "./testDrive";

async function getData(token: any, page: string, pageSize: string) {
  authorization(token);
  try {
    const res = [
      await ServerSideGetWithParams(
        token,
        GET_ALL_TEST_DRIVE_LIST,
        `page=${page}&pageSize=${pageSize}`
      ),
    ];
    const [testDriveList] = res;
    return { testDriveList };
  } catch (e) {}
}

const AllTestDrivesPage = async (props: any) => {
  const token = cookies().get("access_token")?.value || "";
  const { searchParams } = props;
  const page = searchParams?.page || 1;
  const pageSize = searchParams?.pageSize || 10;
  const { testDriveList }: any = await getData(token, page, pageSize);
  return (
    <>
      <PageHeader title="Test Drives" addRoute="/admin/bookings/add" />
      <TestDrives testDriveList={testDriveList.data} />
    </>
  );
};

export default AllTestDrivesPage;

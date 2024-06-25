import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import DetailContainer from "../../../../../../components/container/detailContainer";
import InventoryDetail from "../../../../../../components/inventory/inventoryDetail";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { cookies } from "next/headers";
import {
  GET_BOOKING_LIST,
  GET_OFFER_LIST,
  GET_TEST_DRIVE_LIST,
  GET_WATCH_LIST,
} from "../../../../../../config/endPoints";

async function getData(token: string, id: string) {
  try {
    const res = [
      await ServerSideGetWithId(token, GET_WATCH_LIST, id),
      await ServerSideGetWithId(token, GET_BOOKING_LIST, id),
      await ServerSideGetWithId(token, GET_TEST_DRIVE_LIST, id),
      await ServerSideGetWithId(token, GET_OFFER_LIST, id),
    ];
    const [watchList, bookingList, testDriveList, offerList] = res;
    return { watchList, bookingList, testDriveList, offerList };
  } catch (e) {}
}

const CarDetails = async ({ params }: any) => {
  const _id = params.slug;
  const id = _id.split("_")[0];
  const token = cookies().get("access_token")?.value || "";
  const { watchList, bookingList, testDriveList, offerList }: any =
    await getData(token, id);
  return (
    <>
      <PageHeader title="All New Hyundai Creta - 2021" showBack />
      <DetailContainer>
        <InventoryDetail
          watchList={watchList}
          bookingList={bookingList}
          testDriveList={testDriveList}
          offerList={offerList}
          {...{ token, id }}
        />
      </DetailContainer>
    </>
  );
};

export default CarDetails;

import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import DetailContainer from "../../../../../../components/container/detailContainer";
import InventoryDetail from "../../../../../../components/inventory/inventoryDetail";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { cookies } from "next/headers";
import {
  GET_BOOKING_LIST,
  GET_IMAGES_360,
  GET_OFFER_LIST,
  GET_TEST_DRIVE_LIST,
  GET_VEHICLE,
  GET_WATCH_LIST,
} from "../../../../../../config/endPoints";
import { authorization } from "../../../../../../hoc/auth";

async function getData(token: string, _id: string) {
  authorization(token);
  try {
    const ids = _id.split("_");
    const [id, slug] = ids;
    const res = [
      await ServerSideGetWithId(token, GET_WATCH_LIST, id),
      await ServerSideGetWithId(token, GET_BOOKING_LIST, id),
      await ServerSideGetWithId(token, GET_TEST_DRIVE_LIST, id),
      await ServerSideGetWithId(token, GET_OFFER_LIST, id),
      await ServerSideGetWithId(token, GET_VEHICLE, slug),
    ];
    const [watchList, bookingList, testDriveList, offerList, vehicle_detail] =
      res;
    return {
      id,
      slug,
      watchList,
      bookingList,
      testDriveList,
      offerList,
      vehicle_detail,
    };
  } catch (e) {}
}

const CarDetails = async ({ params }: any) => {
  const _id = params.slug;

  const token = cookies().get("access_token")?.value || "";
  const {
    watchList,
    bookingList,
    testDriveList,
    offerList,
    vehicle_detail,
    id,
  }: any = await getData(token, _id);
  const pageTitle = vehicle_detail?.data?.title;
  return (
    <>
      <PageHeader title={pageTitle} showBack />
      <DetailContainer>
        <InventoryDetail
          watchList={watchList}
          bookingList={bookingList}
          testDriveList={testDriveList}
          offerList={offerList}
          vehicle_detail={vehicle_detail?.data}
          {...{ token, id }}
        />
      </DetailContainer>
    </>
  );
};

export default CarDetails;

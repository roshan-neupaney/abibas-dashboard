import React from "react";
import PageHeader from "../../../../../components/pageHeader";
import FormContainer from "../../../../../components/container/form/formContainer";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../utilities/apiCall";
import {
  CRUD_VEHICLE,
  CRUD_VEHICLE_ENUM,
  GET_VARIANT_FEATURE,
  GET_VARIANT_INSPECTION,
  GET_VARIANT_SPECIFICATION,
} from "../../../../../config/endPoints";
import { cookies } from "next/headers";
import AddEditVehicle from "./addEdit";

async function getData(token: string, _id: string) {
  try {
    if (_id) {
      const ids = _id.split("_");
      const id = ids[0];
      const variant_id = ids[1];
      const res = [
        await ServerSideGetWithId(token, CRUD_VEHICLE, id),
        await ServerSideGet(token, CRUD_VEHICLE_ENUM),
        await ServerSideGetWithId(token, GET_VARIANT_SPECIFICATION, variant_id),
        await ServerSideGetWithId(token, GET_VARIANT_FEATURE, variant_id),
        await ServerSideGetWithId(token, GET_VARIANT_INSPECTION, variant_id),
      ];
      const [
        vehicle,
        vehicle_enum,
        vehicle_specification,
        vehicle_feature,
        vehicle_inspection,
      ] = res;
      return {
        vehicle,
        vehicle_enum,
        vehicle_specification,
        vehicle_feature,
        vehicle_inspection,
      };
    } else {
      const res = [
        await ServerSideGet(token, CRUD_VEHICLE_ENUM),
        await ServerSideGet(token, GET_VARIANT_SPECIFICATION),
        await ServerSideGet(token, GET_VARIANT_FEATURE),
      ];
      const [vehicle_enum, vehicle_specification, vehicle_feature] = res;
      return { vehicle_enum, vehicle_specification, vehicle_feature };
    }
  } catch (error) {}
}

const AddInventory = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value || "";
  const _id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const {
    vehicle,
    vehicle_enum,
    vehicle_specification,
    vehicle_feature,
    vehicle_inspection,
  }: any = await getData(token, _id);
  const ids = _id?.split("_") || [];
  const id = ids[0] || '';
  return (
    <>
      <PageHeader title={isEdit ? 'Edit Car': 'Add Car'} showBack />
      <FormContainer>
        <AddEditVehicle
          {...{
            isEdit,
            token,
            id,
            vehicle,
            vehicle_enum,
            vehicle_specification,
            vehicle_feature,
            vehicle_inspection,
          }}
        />
      </FormContainer>
    </>
  );
};

export default AddInventory;

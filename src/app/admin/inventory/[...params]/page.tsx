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
  GET_VARIANT_SPECIFICATION,
} from "../../../../../config/endPoints";
import { cookies } from "next/headers";
import AddEditVehicle from "./addEdit";

async function getData(token: string, id: string) {
  try {
    if (id) {
      const res = [
        await ServerSideGetWithId(token, CRUD_VEHICLE, id),
        await ServerSideGet(token, CRUD_VEHICLE_ENUM),
        await ServerSideGet(token, GET_VARIANT_SPECIFICATION),
        await ServerSideGet(token, GET_VARIANT_FEATURE),
      ];
      const [vehicle, vehicle_enum, vehicle_specification, vehicle_feature] =
        res;
      return { vehicle, vehicle_enum, vehicle_specification, vehicle_feature };
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
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const { vehicle, vehicle_enum, vehicle_specification, vehicle_feature }: any =
    await getData(token, id);
  return (
    <>
      <PageHeader title="Add Car" showBack />
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
          }}
        />
      </FormContainer>
    </>
  );
};

export default AddInventory;

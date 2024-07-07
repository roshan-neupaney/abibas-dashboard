import React from "react";
import PageHeader from "../../../../../components/pageHeader";
import FormContainer from "../../../../../components/container/form/formContainer";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../utilities/apiCall";
import {
  CRUD_ASSETS_PART_CATEGORY,
  CRUD_VEHICLE,
  CRUD_VEHICLE_ENUM,
  GET_IMAGES_360,
  GET_VARIANT_FEATURE,
  GET_VARIANT_INSPECTION,
  GET_VARIANT_SPECIFICATION,
  GET_VEHICLE_FEATURE,
  GET_VEHICLE_IMAGES,
  GET_VEHICLE_INSPECTION,
  GET_VEHICLE_SPECIFICATION,
} from "../../../../../config/endPoints";
import { cookies } from "next/headers";
import AddEditVehicle from "./addEdit";
import { authorization } from "../../../../../hoc/auth";

async function getData(token: string, _id: string) {
  authorization(token);
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
        await ServerSideGetWithId(token, GET_VEHICLE_IMAGES, id),
        await ServerSideGetWithId(token, GET_VEHICLE_SPECIFICATION, id),
        await ServerSideGetWithId(token, GET_VEHICLE_FEATURE, id),
        await ServerSideGetWithId(token, GET_VEHICLE_INSPECTION, id),
        await ServerSideGetWithId(token, GET_IMAGES_360, id+'/EXT'),
        await ServerSideGetWithId(token, GET_IMAGES_360, id+'/INT'),
        await ServerSideGetWithId(token, CRUD_ASSETS_PART_CATEGORY, 'c2fb64a9-b4a8-43f9-ac16-8b14d9383bd3/detail'),
      ];
      const [
        vehicle,
        vehicle_enum,
        variant_specification,
        variant_feature,
        variant_inspection,
        vechile_images,
        vehicle_specification,
        vehicle_features,
        vehicle_inspection,
        vehicle_ext_360_images,
        vehicle_int_360_images,
        vehicle_body_part
      ] = res;
      return {
        vehicle,
        vehicle_enum,
        variant_specification,
        variant_feature,
        variant_inspection,
        vechile_images,
        vehicle_specification,
        vehicle_features,
        vehicle_inspection,
        vehicle_ext_360_images,
        vehicle_int_360_images,
        vehicle_body_part
      };
    } else {
      const res = [
        await ServerSideGet(token, CRUD_VEHICLE_ENUM),
        await ServerSideGet(token, GET_VARIANT_SPECIFICATION),
        await ServerSideGet(token, GET_VARIANT_FEATURE),
      ];
      const [vehicle_enum, variant_specification, variant_feature] = res;
      return { vehicle_enum, variant_specification, variant_feature };
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
    variant_specification,
    variant_feature,
    variant_inspection,
    vechile_images,
    vehicle_specification,
    vehicle_features,
    vehicle_inspection,
    vehicle_ext_360_images,
    vehicle_int_360_images,
    vehicle_body_part
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
            variant_specification,
            variant_feature,
            variant_inspection,
            vechile_images,
            vehicle_specification,
            vehicle_features,
            vehicle_inspection,
            vehicle_ext_360_images,
            vehicle_int_360_images,
            vehicle_body_part
          }}
        />
      </FormContainer>
    </>
  );
};

export default AddInventory;

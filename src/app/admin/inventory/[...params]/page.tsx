import React from "react";
import PageHeader from "../../../../../components/pageHeader";
import FormContainer from "../../../../../components/container/form/formContainer";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../utilities/apiCall";
import {
  CRUD_BRAND,
  CRUD_CATEGORY,
  CRUD_COLOR,
  CRUD_SHOE,
} from "../../../../../config/endPoints";
import { cookies } from "next/headers";
import AddEditVehicle from "./addEdit";
import { authorization } from "../../../../../hoc/auth";

async function getData(token: string, id: string) {
  authorization(token);
  try {
    if (id) {
      const res = [
        await ServerSideGetWithId(token, CRUD_SHOE, id),
        await ServerSideGet(token, CRUD_CATEGORY+'/active'),
        await ServerSideGet(token, CRUD_BRAND+'/active'),
        await ServerSideGet(token, CRUD_COLOR+'/active'),
      ];
      const [
        shoe,
        shoe_category,
        shoe_brand,
        color
      ] = res;
      return {
        shoe,
        shoe_category,
        shoe_brand,
        color
      };
    } else {
      const res = [
        await ServerSideGet(token, CRUD_CATEGORY+'/active'),
        await ServerSideGet(token, CRUD_BRAND+'/active'),
        await ServerSideGet(token, CRUD_COLOR+'/active'),

      ];
      const [shoe_category, shoe_brand, color] = res;
      return { shoe_category, shoe_brand, color };
    }
  } catch (error) {}
}

const AddInventory = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value || "";
  const _id = params.params[1];
  console.log('_id', _id)
  const isEdit = params.params[0] === "edit";
  const {
    shoe,
    shoe_category,
    shoe_brand,
    color
  }: any = await getData(token, _id);
  return (
    <>
      <PageHeader title={isEdit ? 'Edit Car': 'Add Car'} showBack />
      <FormContainer>
        <AddEditVehicle
          {...{
            isEdit,
            token,
            _id,
            shoe,
            shoe_category,
            shoe_brand,
            color
          }}
        />
      </FormContainer>
    </>
  );
};

export default AddInventory;

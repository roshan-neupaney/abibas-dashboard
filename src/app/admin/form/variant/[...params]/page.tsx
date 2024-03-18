import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../../utilities/apiCall";
import {
  CRUD_COLOR_CHOICE,
  CRUD_FEATURE,
  CRUD_MODEL,
  CRUD_SPECIFICATION,
  CRUD_VARIANT,
} from "../../../../../../config/endPoints";
import AddEditVariant from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if (id !== undefined) {
      const res = [
        await ServerSideGetWithId(token, CRUD_VARIANT, id),
        await ServerSideGet(token, CRUD_MODEL + "/active"),
        await ServerSideGet(token, CRUD_SPECIFICATION + "/active"),
        await ServerSideGet(token, CRUD_FEATURE + "/active"),
        await ServerSideGet(token, CRUD_COLOR_CHOICE + "/active"),
      ];
      const [variant, model, specification, feature, color] = res;
      return { variant, model, specification, feature, color };
    } else {
      const res = [
        await ServerSideGet(token, CRUD_MODEL + "/active"),
        await ServerSideGet(token, CRUD_SPECIFICATION + "/active"),
        await ServerSideGet(token, CRUD_FEATURE + "/active"),
        await ServerSideGet(token, CRUD_COLOR_CHOICE + "/active"),
      ];
      const [model, specification, feature, color] = res;
      return { model, specification, feature, color };
    }
  } catch (error) {}
}

const AddModel = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const { variant, model, specification, feature, color }: any = await getData(
    token,
    id
  );
  
  return (
    <>
      <PageHeader title={isEdit ? "Update Variant" : "Add Variant"} showBack />
      <FormContainer>
        <AddEditVariant
          token={token}
          data={variant?.data}
          isEdit={isEdit}
          id={id}
          {...{ model, specification, feature, color }}
        />
      </FormContainer>
    </>
  );
};

export default AddModel;

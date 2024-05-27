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
  CRUD_ENUM,
  CRUD_FEATURE,
  CRUD_INSPECTIONS,
  CRUD_MODEL,
  CRUD_SPECIFICATION,
  CRUD_VARIANT,
} from "../../../../../../config/endPoints";
import AddEditVariant from "./addEdit";
import { Metadata } from "next";

async function getData(token: any, id: string) {
  try {
    if (id !== undefined) {
      const res = [
        await ServerSideGetWithId(token, CRUD_VARIANT, id),
        await ServerSideGet(token, CRUD_MODEL + "/active"),
        await ServerSideGet(token, CRUD_SPECIFICATION + "/active"),
        await ServerSideGet(token, CRUD_FEATURE + "/active"),
        await ServerSideGet(token, CRUD_COLOR_CHOICE + "/active"),
        await ServerSideGet(token, CRUD_ENUM + "/active"),
        await ServerSideGet(token, CRUD_INSPECTIONS),
        
      ];
      const [variant, model, specification, feature, color, enums, inspection] = res;
      return { variant, model, specification, feature, color, enums, inspection };
    } else {
      const res = [
        await ServerSideGet(token, CRUD_MODEL + "/active"),
        await ServerSideGet(token, CRUD_SPECIFICATION + "/active"),
        await ServerSideGet(token, CRUD_FEATURE + "/active"),
        await ServerSideGet(token, CRUD_COLOR_CHOICE + "/active"),
        await ServerSideGet(token, CRUD_ENUM + "/active"),
        await ServerSideGet(token, CRUD_INSPECTIONS),
      ];
      const [model, specification, feature, color, enums, inspection] = res;
      return { model, specification, feature, color, enums, inspection};
    }
  } catch (error) {}
}

export const metadata: Metadata = {
  title: 'Variant'
 }

const AddModel = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const { variant, model, specification, feature, color, enums, inspection }: any = await getData(
    token,
    id
  );
  metadata.title = isEdit ? 'Edit Variant' : 'Add Variant';
  return (
    
    <>
      <PageHeader title={isEdit ? "Update Variant" : "Add Variant"} showBack />
      <FormContainer>
        <AddEditVariant
          token={token}
          data={variant?.data}
          isEdit={isEdit}
          id={id}
          model= {model}
          specification={specification}
          feature={feature}
          color={color}
          enums={enums} 
          inspection={inspection.data}
        />
      </FormContainer>
    </>
  );
};

export default AddModel;

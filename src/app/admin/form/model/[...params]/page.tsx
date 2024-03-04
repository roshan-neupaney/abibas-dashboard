import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../../utilities/apiCall";
import {
  CRUD_BODY_TYPE,
  CRUD_BRAND,
  CRUD_CATEGORY,
  CRUD_MODEL,
} from "../../../../../../config/endPoints";
import AddEditModel from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if (id !== undefined) {
      const res = [
        await ServerSideGetWithId(token, CRUD_MODEL, id),
        await ServerSideGet(token, CRUD_CATEGORY + "/active"),
        await ServerSideGet(token, CRUD_BRAND + "/active"),
        await ServerSideGet(token, CRUD_BODY_TYPE + "/active"),
      ];
      const [model, category, brand, body_type] = res;
      return { model, category, brand, body_type };
    } else {
      const res = [
        await ServerSideGet(token, CRUD_CATEGORY + "/active"),
        await ServerSideGet(token, CRUD_BRAND + "/active"),
        await ServerSideGet(token, CRUD_BODY_TYPE + "/active"),
      ];
      const [category, brand, body_type] = res;
      return { category, brand, body_type };
    }
  } catch (error) {}
}

const AddModel = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const { model, category, brand, body_type }: any = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? "Update Model" : "Add Model"} showBack />
      <FormContainer>
        <AddEditModel
          token={token}
          data={model?.data}
          isEdit={isEdit}
          id={id}
          {...{ category, brand, body_type }}
        />
      </FormContainer>
    </>
  );
};

export default AddModel;

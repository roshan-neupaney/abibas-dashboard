import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../../utilities/apiCall";
import {
  CRUD_FEATURE,
  CRUD_FEATURE_CATEGORY,
  CRUD_UNIT,
} from "../../../../../../config/endPoints";
import AddEditFeature from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if (id !== undefined) {
      const res = [
        await ServerSideGetWithId(token, CRUD_FEATURE, id),
        await ServerSideGet(token, CRUD_FEATURE_CATEGORY),
        await ServerSideGet(token, CRUD_UNIT),
      ];
      const [feature, feature_category, unit] = res;
      return {feature, feature_category, unit};
    } else {
      const res = [
        await ServerSideGet(token, CRUD_FEATURE_CATEGORY),
        await ServerSideGet(token, CRUD_UNIT),
      ];
      const [feature_category, unit] = res;
      return {feature_category, unit};
    }
  } catch (error) {}
}

const AddFeature = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const {feature, feature_category, unit}: any = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? "Update Feature" : "Add Feature"} showBack />
      <FormContainer>
        <AddEditFeature token={token} data={feature?.data} isEdit={isEdit} id={id} {...{feature_category, unit}} />
      </FormContainer>
    </>
  );
};

export default AddFeature;

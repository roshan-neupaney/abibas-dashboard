import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../../utilities/apiCall";
import {
  CRUD_SPECIFICATION,
  CRUD_SPECIFICATION_CATEGORY,
  CRUD_UNIT,
} from "../../../../../../config/endPoints";
import AddEditSpecification from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if (id !== undefined) {
      const res = [
        await ServerSideGetWithId(token, CRUD_SPECIFICATION, id),
        await ServerSideGet(token, CRUD_SPECIFICATION_CATEGORY),
        await ServerSideGet(token, CRUD_UNIT),
      ];
      const [specification, specification_category, unit] = res;
      return { specification, specification_category, unit };
    } else {
      const res = [
        await ServerSideGet(token, CRUD_SPECIFICATION_CATEGORY),
        await ServerSideGet(token, CRUD_UNIT),
      ];
      const [specification_category, unit] = res;
      return { specification_category, unit };
    }
  } catch (error) {}
}

const AddSpecification = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const { specification, specification_category, unit }: any = await getData(
    token,
    id
  );
  return (
    <>
      <PageHeader title={isEdit ? "Update Specification" : "Add Specification"} showBack />
      <FormContainer>
        <AddEditSpecification
          token={token}
          data={specification?.data}
          isEdit={isEdit}
          id={id}
          {...{ specification_category, unit }}
        />
      </FormContainer>
    </>
  );
};

export default AddSpecification;

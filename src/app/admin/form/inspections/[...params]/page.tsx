import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../../utilities/apiCall";
import {
  CRUD_ASSETS_PARTS,
  CRUD_INSPECTIONS,
  CRUD_INSPECTION_CATEGORY,
} from "../../../../../../config/endPoints";
import AddEditInspection from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if (id !== undefined) {
      const [inspection, inspection_category,body_part] = [
        await ServerSideGetWithId(token, CRUD_INSPECTIONS, id),
        await ServerSideGet(token, CRUD_INSPECTION_CATEGORY),
        await ServerSideGet(token, CRUD_ASSETS_PARTS),
      ];
      return { inspection, inspection_category,body_part };
    } else {
      const [inspection_category, body_part] = [
        await ServerSideGet(token, CRUD_INSPECTION_CATEGORY),
        await ServerSideGet(token, CRUD_ASSETS_PARTS),
      ];
      return { inspection_category, body_part };

    }
  } catch (error) {}
}

const AddInspection = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const {inspection, inspection_category,body_part}: any = await getData(token, id);
  return (
    <>
      <PageHeader
        title={isEdit ? "Update Inspection" : "Add Inspection"}
        showBack
      />
      <FormContainer>
        <AddEditInspection token={token} data={inspection?.data} isEdit={isEdit} id={id} {...{inspection_category, body_part}} />
      </FormContainer>
    </>
  );
};

export default AddInspection;

import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_INSPECTION_CATEGORY } from "../../../../../../config/endPoints";
import AddEditInspectionCategory from "./addEdit";

async function getData(token: any, id: string) {
  try {
    const res = await ServerSideGetWithId(token, CRUD_INSPECTION_CATEGORY, id);
    return res?.data;
  } catch (error) {}
}

const AddInspectionCategory = async ({params}: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === 'edit'
  const data = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? 'Update Inspection Category' : 'Add Inspection Category'} showBack />
      <FormContainer>
        <AddEditInspectionCategory token={token} data={data} isEdit={isEdit} id={id} />
      </FormContainer>
    </>
  );
};

export default AddInspectionCategory;

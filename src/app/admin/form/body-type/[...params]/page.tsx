import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_BODY_TYPE } from "../../../../../../config/endPoints";
import AddEditBodyType from "./addEdit";
import { authorization } from "../../../../../../hoc/auth";

async function getData(token: any, id: string) {
  authorization(token);
  try {
    const res = await ServerSideGetWithId(token, CRUD_BODY_TYPE, id);
    return res?.data;
  } catch (error) {}
}

const AddBodyType = async ({params}: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === 'edit'
  const data = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? 'Update Body Type' : 'Add Body Type'} showBack/>
      <FormContainer>
        <AddEditBodyType token={token} data={data} isEdit={isEdit} id={id} />
      </FormContainer>
    </>
  );
};

export default AddBodyType;

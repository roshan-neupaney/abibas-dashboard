import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_ENUM } from "../../../../../../config/endPoints";
import AddEditEnum from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if(id){
      const res = [
        await ServerSideGetWithId(token, CRUD_ENUM, id),
      ];
      const [enum_detail] = res;
      return { enum_detail};
    }
    return {};
  } catch (error) {}
}

const AddBlog = async ({params}: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === 'edit'
  const {enum_detail}: any = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? 'Update Enum' : 'Add Enum'} showBack />
      <FormContainer>
        <AddEditEnum token={token} data={enum_detail?.data} isEdit={isEdit} id={id}/>
      </FormContainer>
    </>
  );
};

export default AddBlog;

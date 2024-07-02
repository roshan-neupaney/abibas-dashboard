import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import AddEditCategory from "./addEdit";
import { cookies } from "next/headers";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_CATEGORY } from "../../../../../../config/endPoints";
import { Metadata } from "next";
import { authorization } from "../../../../../../hoc/auth";

async function getData(token: any, id: string) {
  authorization(token);
  try {
    if(id){
      const res = await ServerSideGetWithId(token, CRUD_CATEGORY, id);
      return res?.data;
    }
  } catch (error) {}
}

export const metadata: Metadata = {
  title: 'Category'
}

const AddCategory = async ({params}: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === 'edit'
  const data = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? 'Update Category' : 'Add Category'} showBack />
      <FormContainer>
        <AddEditCategory token={token} data={data} isEdit={isEdit} id={id} />
      </FormContainer>
    </>
  );
};

export default AddCategory;

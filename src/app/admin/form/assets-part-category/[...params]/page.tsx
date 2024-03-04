import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_ASSETS_PART_CATEGORY } from "../../../../../../config/endPoints";
import AddEditSpecificationCategory from "./addEdit";
import AddEditAssetsPartCategory from "./addEdit";

async function getData(token: any, id: string) {
  try {
    const res = await ServerSideGetWithId(token, CRUD_ASSETS_PART_CATEGORY, id);
    return res?.data;
  } catch (error) {}
}

const AddAssetsPartCategory = async ({params}: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === 'edit'
  const data = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? 'Update Assets Part Category' : 'Add Assets Part Category'} showBack />
      <FormContainer>
        <AddEditAssetsPartCategory token={token} data={data} isEdit={isEdit} id={id} />
      </FormContainer>
    </>
  );
};

export default AddAssetsPartCategory;

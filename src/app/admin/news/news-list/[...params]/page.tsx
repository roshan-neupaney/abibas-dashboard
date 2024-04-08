import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_BRAND } from "../../../../../../config/endPoints";
import AddEditNews from "./addEdit";

async function getData(token: any, id: string) {
  try {
    const res = await ServerSideGetWithId(token, CRUD_BRAND, id);
    return res?.data;
  } catch (error) {}
}

const AddNews = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const data = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? "Update News" : "Add News"} showBack />
      <FormContainer>
        <AddEditNews token={token} data={data} isEdit={isEdit} id={id} />
      </FormContainer>
    </>
  );
};

export default AddNews;

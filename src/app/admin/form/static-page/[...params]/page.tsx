import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import {
  ServerSideGet,
  ServerSideGetWithId,
} from "../../../../../../utilities/apiCall";
import {
  CRUD_ENUM,
  CRUD_STATIC_PAGE,
} from "../../../../../../config/endPoints";
import AddEditStaticPage from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if (id) {
      const res = [
        await ServerSideGetWithId(token, CRUD_STATIC_PAGE, id),
        await ServerSideGet(token, CRUD_ENUM),
      ];
      const [static_page_detail, enums] = res;
      return { static_page_detail, enums };
    } else {
      const res = [await ServerSideGet(token, CRUD_ENUM)];
      const [enums] = res;
      return { enums };
    }
  } catch (error) {}
}

const AddStaticPage = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const { static_page_detail, enums }: any = await getData(token, id);
  return (
    <>
      <PageHeader
        title={isEdit ? "Update Static Page" : "Add Static Page"}
        showBack
      />
      <FormContainer>
        <AddEditStaticPage
          token={token}
          data={static_page_detail?.data}
          isEdit={isEdit}
          id={id}
          enums={enums}
        />
      </FormContainer>
    </>
  );
};

export default AddStaticPage;

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
  CRUD_ASSETS_PART_CATEGORY,
  CRUD_INSPECTION_CATEGORY,
} from "../../../../../../config/endPoints";
import AddEditAssetsPart from "./addEdit";

async function getData(token: any, id: string) {
  try {
    if (id) {
      const [assets_part, assets_part_category] = [
        await ServerSideGetWithId(token, CRUD_ASSETS_PARTS, id),
        await ServerSideGet(token, CRUD_ASSETS_PART_CATEGORY + '/active' ),
      ];
      return { assets_part, assets_part_category };
    } else {
      const [assets_part_category] = [
        await ServerSideGet(token, CRUD_ASSETS_PART_CATEGORY + '/active'),
      ];
      return { assets_part_category };
    }
  } catch (error) {}
}

const AddAssetsPart = async ({ params }: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === "edit";
  const { assets_part, assets_part_category}: any = await getData(token, id);
  return (
    <>
      <PageHeader
        title={isEdit ? "Update Assets Part" : "Add Assets Part"}
        showBack
      />
      <FormContainer>
        <AddEditAssetsPart token={token} data={assets_part?.data} isEdit={isEdit} id={id} {...{assets_part_category}} />
      </FormContainer>
    </>
  );
};

export default AddAssetsPart;

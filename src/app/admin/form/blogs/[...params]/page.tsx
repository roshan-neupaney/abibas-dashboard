import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import { ServerSideGet, ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_BLOG, CRUD_BLOG_CATEGORY } from "../../../../../../config/endPoints";
import AddEditBlog from "./addEdit";
import { authorization } from "../../../../../../hoc/auth";

async function getData(token: any, id: string) {
  authorization(token);
  try {
    if(id){
      const res = [
        await ServerSideGetWithId(token, CRUD_BLOG, id),
        await ServerSideGet(token, CRUD_BLOG_CATEGORY),
      ];
      const [blog_detail, blog_category] = res;
      return { blog_detail, blog_category };
    } else {
      const res = [await ServerSideGet(token, CRUD_BLOG_CATEGORY)];
      const [blog_category] = res;
      return {blog_category};
    }
  } catch (error) {}
}

const AddBlog = async ({params}: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === 'edit'
  const {blog_category, blog_detail}: any = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? 'Update Blog' : 'Add Blog'} showBack />
      <FormContainer>
        <AddEditBlog token={token} data={blog_detail?.data} isEdit={isEdit} id={id} {...{blog_category}} />
      </FormContainer>
    </>
  );
};

export default AddBlog;

import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_BLOG_CATEGORY } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";
import BlogCategory from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_BLOG_CATEGORY);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Blog Category'
}

const BlogPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Blog Category" addRoute="/admin/form/blog-category/add" />
        <BlogCategory _data={data} {...{token}} />
    </>
  );
};

export default BlogPage;

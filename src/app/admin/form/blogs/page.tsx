import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_BLOG } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import { Metadata } from "next";
import Blog from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_BLOG);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Blogs'
}

const BlogPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Blogs" addRoute="/admin/form/blogs/add" />
        <Blog _data={data} {...{token}} />
    </>
  );
};

export default BlogPage;

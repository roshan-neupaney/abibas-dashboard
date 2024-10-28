import { cookies } from "next/headers";
import PageHeader from "../../../../components/pageHeader";
import { ServerSideGet } from "../../../../utilities/apiCall";
import { CRUD_USER } from "../../../../config/endPoints";
import { authorization } from "../../../../hoc/auth";
import Users from "./childPage";
import { Metadata } from "next";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_USER);
    return res?.data;
  } catch(e) {
  }
}

export const metadata: Metadata = {
  title: 'Users'
}

const UsersPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Users" addRoute="/admin/users/add" />
        <Users _data={data} {...{token}} />
    </>
  );
};

export default UsersPage;

import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import { cookies } from "next/headers";
import { ServerSideGetWithId } from "../../../../../../utilities/apiCall";
import { CRUD_UNIT } from "../../../../../../config/endPoints";
import AddEditColor from "./addEdit";
import { authorization } from "../../../../../../hoc/auth";

async function getData(token: any, id: string) {
  authorization(token);
  try {
    const res = await ServerSideGetWithId(token, CRUD_UNIT, id);
    return res?.data;
  } catch (error) {}
}

const AddCategory = async ({params}: any) => {
  const token = cookies().get("access_token")?.value;
  const id = params.params[1];
  const isEdit = params.params[0] === 'edit'
  const data = await getData(token, id);
  return (
    <>
      <PageHeader title={isEdit ? 'Update Unit' : 'Add Unit'} showBack />
      <FormContainer>
        <AddEditColor token={token} data={data} isEdit={isEdit} id={id} />
      </FormContainer>
    </>
  );
};

export default AddCategory;

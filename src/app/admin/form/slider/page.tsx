import { cookies } from "next/headers";
import PageHeader from "../../../../../components/pageHeader";
import { ServerSideGet } from "../../../../../utilities/apiCall";
import { CRUD_SLIDER } from "../../../../../config/endPoints";
import { authorization } from "../../../../../hoc/auth";
import Slider from "./childPage";

async function getData(token: any) {
  authorization(token);
  try{
    const res = await ServerSideGet(token, CRUD_SLIDER);
    return res?.data;
  } catch(e) {
  }
}

const SliderPage = async() => {
  const token = cookies().get('access_token')?.value;
  const data = await getData(token);

  return (
    <>
      <PageHeader title="Slider" addRoute="/admin/form/slider/add" />
        <Slider _data={data} token={token} />
    </>
  );
};

export default SliderPage;

import { Suspense } from "react";
import NoDataFound from "../../../../components/noDataFound";
import PageHeader from "../../../../components/pageHeader";
import axios from "axios";
import DummyData from "../../../../components/dummyData";
import { authorization } from "../../../../hoc/auth";

async function getData(val: string) {
  try {
    authorization();
    const res = await axios.get(
      `https://fakestoreapi.com/products?limit=${val}`
    );
    return res?.data;
  } catch (error) {}
}

const Catalogue = async (props: any) => {
  const { searchParams } = props;
  const data = await getData(searchParams.query);

  return (
    <>
      <PageHeader title="Catalogue" />
      {data?.length > 0 ? <DummyData data={data} /> : <NoDataFound />}
    </>
  );
};

export default Catalogue;

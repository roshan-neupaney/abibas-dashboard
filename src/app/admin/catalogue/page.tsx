import { Suspense } from "react";
import NoDataFound from "../../../../components/noDataFound";
import PageHeader from "../../../../components/pageHeader";
import { CircularLoader } from "../../../../components/loader/loader";
import axios from "axios";
import DummyData from "../../../../components/dummyData";

async function getData() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res?.data;
  } catch (error) {}
}

const Catalogue = async () => {
  const data = await getData();

  return (
    <>
      <PageHeader title="Catalogue" />
      {data?.length > 0 ? (
        <Suspense fallback={<CircularLoader />}>
          <DummyData data={data} />
        </Suspense>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default Catalogue;

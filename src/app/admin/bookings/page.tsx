import PageHeader from "../../../../components/pageHeader";
import Bookings from "./bookings";

const InventoryPage = () => {
  return (
    <>
      <PageHeader title="Bookings" addRoute="/admin/bookings/add" />
        <Bookings />
    </>
  );
};

export default InventoryPage;

import PageHeader from "../../../../components/pageHeader";
import Customers from "./customers";

const InventoryPage = () => {
  return (
    <>
      <PageHeader title="Customers" addRoute="/admin/customers/add" />
        <Customers />
    </>
  );
};

export default InventoryPage;

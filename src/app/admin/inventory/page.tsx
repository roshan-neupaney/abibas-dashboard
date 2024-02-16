import PageHeader from "../../../../components/pageHeader";
import Inventory from "./inventory";

const InventoryPage = () => {
  return (
    <>
      <PageHeader title="Inventory" addRoute="/admin/inventory/add" />
        <Inventory />
    </>
  );
};

export default InventoryPage;

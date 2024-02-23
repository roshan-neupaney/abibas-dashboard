import PageHeader from "../../../../components/pageHeader";
import Agents from "./agents";

const AgentsPage = () => {
  return (
    <>
      <PageHeader title="Customers" addRoute="/admin/agents/add" />
        <Agents />
    </>
  );
};

export default AgentsPage;

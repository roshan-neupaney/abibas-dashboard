import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import DetailContainer from "../../../../../../components/container/detailContainer";
import CustomerDetail from "../../../../../../components/customers/customerDetail";

const CustomerDetailPage = () => {
  return (
    <>
      <PageHeader title="Durga Magar" showBack />
      <DetailContainer>
        <CustomerDetail />
      </DetailContainer>
    </>
  );
};

export default CustomerDetailPage;

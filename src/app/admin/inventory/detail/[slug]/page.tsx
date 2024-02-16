import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import FormContainer from "../../../../../../components/container/form/formContainer";
import DetailContainer from "../../../../../../components/container/detailContainer";
import InventoryDetail from "../../../../../../components/inventory/inventoryDetail";

const CarDetails = () => {
  return (
    <>
      <PageHeader title="All New Hyundai Creta - 2021" showBack />
      <DetailContainer>
        <InventoryDetail />
      </DetailContainer>
    </>
  );
};

export default CarDetails;

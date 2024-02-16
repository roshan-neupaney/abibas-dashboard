import React from "react";
import PageHeader from "../../../../../../components/pageHeader";
import DetailHero from "../../../../../../components/bookings/section/detailHero";
import DetailSideBar from "../../../../../../components/bookings/section/sidebar";
import OfferSection from "../../../../../../components/bookings/section/offerSection";
import OwnerDetailSection from "../../../../../../components/bookings/section/ownerDetailSection";
import BookingSummary from "../../../../../../components/bookings/section/bookingSummary";
import FinalPayment from "../../../../../../components/bookings/section/finalPayment";
import Documents from "../../../../../../components/bookings/section/documents";
import { Button, SubmitButton } from "@/subComponents/buttons";

const AddBookings = () => {
  return (
    <>
      <PageHeader title="Booking Details" />
      <div className="booking-detail-container">
        <div className="flex flex-1 flex-col gap-3">
          <DetailHero />
          <OfferSection />
          <OwnerDetailSection />
          <BookingSummary />
          <Documents />
          <FinalPayment />
          <div className="flex pb-6 gap-2 items-center">
            <SubmitButton title="Complete Order" style={{backgroundColor: '#E60012'}}/>
          </div>
        </div>
        <DetailSideBar />
      </div>
    </>
  );
};

export default AddBookings;

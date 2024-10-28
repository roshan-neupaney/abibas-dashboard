const BookingSummary = () => {
  return (
    <div className="booking-section p-6 flex-col">
      <div className="flex pb-6 gap-2 items-center">
        <label className="headline-medium-NH">Booking Summary</label>
      </div>
      <div className="flex justify-between py-2">
        <label className="body-medium">Booking amount (100% Refundable)</label>
        <label className="label-large">Rs. 10,000</label>
      </div>
      <div className="flex justify-between py-2 title-medium">
        <label>Grand Total</label>
        <label style={{ color: "#E60012" }}>Nrs. 10,000</label>
      </div>
    </div>
  );
};

export default BookingSummary;

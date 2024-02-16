const FinalPayment = () => {
  return (
    <div className="booking-section p-6 flex-col">
      <div className="flex pb-6 gap-2 items-center">
        <label className="headline-medium-NH">Final Payment</label>
      </div>
      <div className="flex justify-between py-2">
        <label className="body-medium">Booking amount</label>
        <label className="label-large">Rs. 10,000</label>
      </div>
      <div className="flex justify-between py-2">
        <label className="body-medium">Assurance</label>
        <label className="label-large" style={{ color: "#4DCB69" }}>
          Included
        </label>
      </div>
      <div className="flex justify-between py-2">
        <label className="body-medium">1-year warranty</label>
        <label className="label-large" style={{ color: "#4DCB69" }}>
          Included
        </label>
      </div>
      <div className="flex justify-between py-2">
        <label className="body-medium">Insurance</label>
        <label className="label-large" style={{ color: "#4DCB69" }}>
          Included
        </label>
      </div>

      <div className="flex justify-between py-2">
        <label className="body-medium">Remaining Amount</label>
        <label className="label-large">Rs. 56,53,000</label>
      </div>
      <div className="flex justify-between py-2 title-medium">
        <label>Grand Total</label>
        <label style={{ color: "#E60012" }}>Nrs. 56,63,000</label>
      </div>
    </div>
  );
};

export default FinalPayment;

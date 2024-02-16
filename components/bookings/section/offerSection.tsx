import Image from "next/image";
import check from "../../../public/icons/check-circle.svg";

const OfferSection = () => {
  return (
    <div className="booking-section p-6 flex-col">
      <div className="flex pb-6 gap-2 items-center">
        <label className="headline-medium-NH"> Offer Made</label>
        <div className="offer-tag">
          <div className="flex">
            <Image src={check} width={12} height={12} alt="" />
          </div>
          <span className="label-medium-NH" style={{ color: "#1A702C" }}>
            Accepted
          </span>
        </div>
      </div>
      <div className="flex justify-between py-2">
        <label className="body-medium">Offered Price</label>
        <label className="label-large">Nrs. 56,63,000 (10% less)</label>
      </div>
      <div className="flex justify-between py-2 title-medium">
        <label>Grand Total</label>
        <label style={{ color: "#E60012" }}>
          Nrs. 56,63,000
        </label>
      </div>
    </div>
  );
};

export default OfferSection;

import Image from "next/image";
import carImage from "../../../public/images/creta.png";
import pumpIcon from "../../../public/icons/pump.svg";
import gearIcon from "../../../public/icons/driven.svg";
import meterIcon from "../../../public/icons/meter.svg";

const DetailHero = () => {
  return (
    <div className="items-center gap-5 flex flex-1 booking-section">
      <Image src={carImage} width={190} height={140} alt="" />
      <div className="flex py-3 flex-col flex-1">
        <label className="title-medium">All New Hyundai Creta - 2021</label>
        <div className="flex gap-4 pt-2 self-stretch">
          <span className="flex items-center gap-2">
            <Image src={pumpIcon} width={16} height={16} alt="" />
            <label className="label-medium">Petrol</label>
          </span>
          <span className="flex items-center gap-2">
            <Image src={meterIcon} width={16} height={16} alt="" />
            <label className="label-medium">24,000 KM</label>
          </span>
          <span className="flex items-center gap-2">
            <Image src={gearIcon} width={16} height={16} alt="" />
            <label className="label-medium">Automatic</label>
          </span>
        </div>
        <div className="flex gap-4 pt-2 items-center">
          <label className="bookings-price-label ">NRS. 58 Lakh</label>
          <label className="bookings-price-cancle-label">NRS. 62 Lakh</label>
        </div>
      </div>
    </div>
  );
};

export default DetailHero;

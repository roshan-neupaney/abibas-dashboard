import Image from "next/image";
import Avatar from "../../public/images/avatar-2.png";
import Dot from "../../public/icons/Ellipse.svg";
import Avatar1 from "../../public/images/avatar.png";
import carImage from "../../public/images/creta.png";
import pumpIcon from "../../public/icons/pump.svg";
import gearIcon from "../../public/icons/driven.svg";
import meterIcon from "../../public/icons/meter.svg";

const Overview = () => {
  return (
    <div className="flex p-4 gap-5 self-stretch">
      <DetailBox />
      <SideBar />
    </div>
  );
};

export default Overview;

const DetailBox = () => {
  return (
    <>
      <div className="flex p-5 flex-col flex-1 self-stretch user-detail-container">
        <div className="flex self-stretch items-center gap-5 pb-4">
          <span className="title-large-NH"> Customer Details</span>
        </div>
        <div className="flex flex-col self-stretch">
          <span className="flex pb-5">
            <Image src={Avatar} width={80} height={80} alt="" />
          </span>
          <div className="flex gap-5 py-2">
            <label className="flex w-32 user-detail-label">Name</label>
            <label className="label-large-NH">Durga Magar</label>
          </div>
          <div className="flex gap-5 py-2">
            <label className="flex w-32 user-detail-label">Role Type</label>
            <label className="label-large-NH">Customer</label>
          </div>
          <div className="flex gap-5 py-2">
            <label className="flex w-32 user-detail-label">Phone</label>
            <label className="label-large-NH">9812345678</label>
          </div>
          <div className="flex gap-5 py-2">
            <label className="flex w-32 user-detail-label">Email</label>
            <label className="label-large-NH">dummymail@durgamagar.com</label>
          </div>
          <div className="flex gap-5 py-2">
            <label className="flex w-32 user-detail-label">Address</label>
            <label className="label-large-NH">
              Street, Area, City, Province
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const SideBar = () => {
  return (
    <>
      <div className="user-detail-sideBar">
        <div className="flex pt-6 px-5 pb-8 flex-col self-stretch border-b border-[#D8DADB]">
          <div className="flex pb-3">
            <span className="title-medium-NH">Contact Agent</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <Image src={Avatar1} alt="" width={56} height={56} />
            </span>
            <div className="flex flex-col ">
              <label className="label-large-NH">Andy Morano</label>
              <label className="body-small-NH">Agent</label>
            </div>
          </div>
        </div>
        <div className="flex pt-6 px-5 pb-8 flex-col self-stretch border-b border-[#D8DADB] gap-3">
          <div className="flex">
            <span className="title-medium-NH">History</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>
            <Image src={carImage} width={89} height={67} alt="" />
            </span>
            <div className="flex flex-col flex-1">
              <label className="title-medium">
                All New Hyundai Creta - 2021
              </label>
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
              <div className="flex gap-4 pt-1 items-center">
                <label className="title-medium">NRS. 58 Lakh</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex pt-6 px-5 pb-8 flex-col self-stretch border-b border-[#D8DADB] gap-3">
          <div className="flex">
            <span className="title-medium-NH">Joined on</span>
          </div>
          <label className="label-large-NH">29 Sept, 2022</label>
        </div>

        <div className="flex pt-6 px-5 pb-8 flex-col self-stretch border-b border-[#D8DADB] gap-3">
          <div className="title-medium-NH">Activity Log</div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex col gap-3">
              <span className="title-small-NH">29 Mar, 2023</span>
              <div className="flex col">
                <span className="body-small-NH">02:09 PM</span>
                <span className="label-large-NH">Bivek Rana Was assigned</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex col gap-3">
              <span className="title-small-NH">24 Mar, 2023</span>
              <div className="flex col">
                <span className="body-small-NH">02:09 PM</span>
                <span className="label-large-NH">
                  Asim Singh booked this car.
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex col gap-3">
              <span className="title-small-NH">24 Mar, 2023</span>
              <div className="flex col">
                <span className="body-small-NH">02:09 PM</span>
                <span className="label-large-NH">
                  Somebody updated Something.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

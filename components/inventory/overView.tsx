import Image from "next/image";
import Avatar from "../../public/images/avatar.png";
import Dot from "../../public/icons/Ellipse.svg";
import ProductOverview from "./dropdown/productOverview";
import CarSpecification from "./dropdown/carSpecification";
import DetailHeroSection from "./section/detailHeroSection";
import { IMAGE_URL } from "../../config/constants";
import DamageMap from "./dropdown/damageMap";
import CarFeature from "./dropdown/carFeature";
import CarInspection from "./dropdown/carInspection";

const Overview = ({ vehicle_detail, vehicleDamage }: any) => {
  return (
    <div className="body-container flex gap-5 p-4">
      <DetailBox {...{ vehicle_detail, vehicleDamage }} />
      <div className="hidden xl:flex">
        <SideBar />
      </div>
    </div>
  );
};

export default Overview;

const DetailBox = ({ vehicle_detail, vehicleDamage }: any) => {
  const ExtImages360 = vehicle_detail?.vehicle360Images?.filter(
    (items: any) => items.type === "EXT"
  );
  const IntImages360 = vehicle_detail?.vehicle360Images?.filter(
    (items: any) => items.type === "INT"
  );
  const galleryImages = vehicle_detail?.vehicleImages?.map((items: any) => {
    return {
      original: IMAGE_URL + "/" + items.image_name,
      thumbnail: IMAGE_URL + "/" + items.image_name,
    };
  });
  return (
    <div className="flex flex-1 flex-col gap-6">
      <DetailHeroSection
        ExtImages360={ExtImages360}
        IntImages360={IntImages360}
        galleryImages={galleryImages}
      />
      <ProductOverview {...{ vehicle_detail }} />

      {vehicle_detail?.vehicleSpecification?.length > 0 && (
        <CarSpecification
          vehicleSpecification={vehicle_detail?.vehicleSpecification}
        />
      )}
      {vehicle_detail?.vehicleFeatures?.length > 0 && (
        <CarFeature vehicleFeature={vehicle_detail?.vehicleFeatures} />
      )}

      {vehicleDamage.length > 0 && <DamageMap vehicleDamage={vehicleDamage} />}

      {vehicle_detail?.vehicleFeatures?.length > 0 && (
        <CarInspection vehicleInspection={vehicle_detail?.vehicleInspection} />
      )}
    </div>
  );
};

const SideBar = () => {
  return (
    <>
      <div className="flex flex-col border lg:max-w-96 max-w-64 border-solid border-[#d8dadb] h-fit bg-[#eff1f1] rounded sticky top-3 ">
        <div
          className="flex py-4 px-5 flex-col w-full"
          style={{ borderBottom: "1px solid #D8DADB" }}
        >
          <div className="title-medium-NH pb-3">Customer Details</div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <span className="flex gap-2">
                <Image src={Avatar} width={56} height={56} alt="" />
              </span>
              <div className="flex flex-col">
                <span className="label-large">Asim Singh</span>
                <span className="body-small-NH">User</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="label-large-NH">Name:</span>
              <span className="body-medium-NH">Sanjay Malla</span>
            </div>
            <div className="flex gap-2">
              <span className="label-large-NH">Phone:</span>
              <span className="body-medium-NH">9812345678</span>
            </div>
            <div className="flex gap-2">
              <span className="label-large-NH">Email:</span>
              <span className="body-medium-NH">sanjaymalla@mail.com</span>
            </div>
            <div className="flex gap-2">
              <span className="label-large-NH">Address:</span>
              <span className="body-medium-NH">
                City road, Durbar Road, Kathmandu
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex self-stretch py-4 px-5 flex-col"
          style={{ borderBottom: "1px solid #D8DADB" }}
        >
          <div className="title-medium-NH pb-3">Sales Representative</div>
          <div className="flex gap-3">
            <span>
              <Image src={Avatar} width={32} height={32} alt="" />
            </span>
            <span className="label-large-NH">Bivek Rana</span>
          </div>
        </div>
        <div
          className="flex self-stretch py-4 px-5 flex-col"
          style={{ borderBottom: "1px solid #D8DADB" }}
        >
          <div className="title-medium-NH pb-3">Added By</div>
          <div className="flex">
            <span className="label-large-NH">Bivek Rana on 29 Sept, 2022</span>
          </div>
        </div>
        <div className="flex self-stretch py-4 px-5 flex-col">
          <div className="title-medium-NH pb-3">Activity Log</div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex flex-col gap-3">
              <span className="title-small-NH">29 Mar, 2023</span>
              <div className="flex flex-col">
                <span className="body-small-NH">02:09 PM</span>
                <span className="label-large-NH">Bivek Rana Was assigned</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex flex-col gap-3">
              <span className="title-small-NH">24 Mar, 2023</span>
              <div className="flex flex-col">
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
            <div className="flex flex-col gap-3">
              <span className="title-small-NH">24 Mar, 2023</span>
              <div className="flex flex-col">
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

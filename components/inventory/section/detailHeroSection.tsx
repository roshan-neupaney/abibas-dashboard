import { useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Vehicle360View from "../360View";

const DetailHeroSection = ({ExtImages360, IntImages360, galleryImages}:any) => {
  const [open360, toggle360] = useState(false);
  
  return (
    <div
      style={{ width: "100%", height: 'fit-content' }}
      className="relative flex justify-center items-center"
    >
      <div
        className="flex justify-center items-center absolute bottom-[5%] py-2 px-4 bg-[#20252938] rounded-xl z-10 cursor-pointer"
        onClick={() => toggle360(!open360)}
      >
        <span className="text-white text-base">
          {open360 ? "Hide" : "Show"} 360&deg; view
          
        </span>
      </div>
      {open360 ? (
        <Vehicle360View {...{ExtImages360, IntImages360}} />
      ) : (
        <ReactImageGallery items={galleryImages} thumbnailPosition="left" />
      )}
    </div>
  );
};

export default DetailHeroSection;

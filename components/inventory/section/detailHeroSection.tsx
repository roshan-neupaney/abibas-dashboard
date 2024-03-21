import { useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import React360 from "../360View";

const DetailHeroSection = () => {
  const [open360, toggle360] = useState(false);
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <div
      style={{ width: "100%" }}
      className="relative flex justify-center items-center"
    >
      <div
        className="flex justify-center items-center py-3 px-10 absolute bottom-[5%] rounded bg-[#747878] z-10 cursor-pointer"
        onClick={() => toggle360(!open360)}
      >
        <span className="text-white text-base">
          {open360 ? "Hide" : "Show"} 360&deg; VIEW
          
        </span>
      </div>
      {open360 ? (
        <React360 />
      ) : (
        <ReactImageGallery items={images} thumbnailPosition="left" />
      )}
    </div>
  );
};

export default DetailHeroSection;

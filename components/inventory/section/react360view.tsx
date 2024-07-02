import { useEffect } from "react";
// @ts-ignore
import ThreeSixty from "react-360-view";
import { IMAGE_URL } from "../../../config/constants";

const Vehicle360View =({ExtImages360, IntImages360}: any) => {
  
  useEffect(() => {
    const container = document.getElementById("identifier");
    container?.addEventListener("wheel", (event) => {
      event.stopPropagation();
    });
    return () => {
      container?.removeEventListener("wheel", (event) => {
        event.stopPropagation();
      });
    };
  }, []);

const imageName = ExtImages360?.data[0]?.image_name?.replace(/(\d+)(?=\.\w+$)/, '{index}');
console.log(imageName);

  return (
    <div className="w-full">
      <ThreeSixty
        amount={ExtImages360?.data?.length}
        imagePath={IMAGE_URL}
        fileName={imageName}
        disableZoomin
      />
    </div>
  );
}

export default Vehicle360View;

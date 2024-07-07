import { useEffect } from "react";
// @ts-ignore
import ThreeSixty from "react-360-view";
import { IMAGE_URL } from "../../../config/constants";

const VehicleExterior360View =({ExtImages360}: any) => {
  
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

const imageName = ExtImages360[0]?.image_name?.replace(/(\d+)(?=\.\w+$)/, '{index}');

  return (
    <div className="w-full">
      <ThreeSixty
        amount={ExtImages360?.length}
        imagePath={IMAGE_URL}
        fileName={imageName}
        disableZoomin
      />
    </div>
  );
}

export default VehicleExterior360View;

import { useEffect } from "react";
//@ts-ignore
import ThreeSixty from "react-360-view";
import { IMAGE_URL } from "../../config/constants";

const basePath = "https://fastly-production.24c.in/webin/360";
export default function React360({Images360, id}: any) {
  
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

console.log('Images360', Images360)

// const replaceNumberWithIndex = (imageName: string) => {
//   return imageName?.replace(/(\d+)(?=\.\w+$)/, '{index}');
// }

const imageName = Images360?.data[0]?.image_name?.replace(/(\d+)(?=\.\w+$)/, '{index}');
console.log(imageName);

  return (
    <div className="w-full">
      <ThreeSixty
        amount={2}
        imagePath={IMAGE_URL}
        fileName={imageName}
        spinReverse
        disableZoomin
        paddingIndex
      />
    </div>
  );
}

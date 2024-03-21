import { useEffect } from "react";
//@ts-ignore
import ThreeSixty from "react-360-view";

const basePath = "https://fastly-production.24c.in/webin/360";
export default function React360() {
  
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
  return (
    <div className="w-full">
      <ThreeSixty
        amount={75}
        imagePath={basePath}
        fileName="output_{index}.jpeg"
        spinReverse
        disableZoomin
      />
    </div>
  );
}

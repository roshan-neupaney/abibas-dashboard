import Image from "next/image";
import { useState } from "react";
import noImage from "../public/icons/noImage.svg";

const LazyImage = (props: any) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(noImage);
  };
  return (
    <Image src={imgSrc} {...rest} loading="lazy" onError={handleError} alt="" />
  );
};

export default LazyImage;

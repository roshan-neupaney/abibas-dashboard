"use client";
import Image from "next/image";
import AddIcon from "../../public/icons/icon-left-white.svg";
import { useRouter } from "next/navigation";

interface ButtonProps {
  addRoute?: string;
  title: string;
  style?: any;
  onClick?: any;
  addIcon?: boolean;
}

export const Button = ({ addRoute = "", title, addIcon = false }: ButtonProps) => {
  const router = useRouter();
  return (
    <button className="add-button" onClick={() => router.push(addRoute)}>
      {addIcon && <Image src={AddIcon} alt="" width={20} height={20} />}
      <span className="label-add">{title}</span>
    </button>
  );
};

export const SubmitButton = ({ title, style = {}, onClick='' }: ButtonProps) => {
  const router = useRouter();
  return (
    <div className="submit-button" style={style} onClick={onClick}>
      <span className="label-submit">{title}</span>
    </div>
  );
};
export const CancelButton = ({ title }: ButtonProps) => {
  return (
    <div className="cancel-button">
      <span className="label-cancel">{title}</span>
    </div>
  );
};

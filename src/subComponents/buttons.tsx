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
  disabled?: boolean;
}

export const Button = ({
  addRoute = "",
  title,
  addIcon = false,
}: ButtonProps) => {
  const router = useRouter();
  return (
    <button className="add-button" onClick={() => router.push(addRoute)}>
      {addIcon && <Image src={AddIcon} alt="" width={20} height={20} />}
      <span className="label-add">{title}</span>
    </button>
  );
};

export const SubmitButton = ({
  title,
  style = {},
  onClick = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className="submit-button"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="label-submit">{title}</span>
    </button>
  );
};


export const CancelButton = ({ title, onClick }: ButtonProps) => {
  return (
    <div className="cancel-button" onClick={onClick}>
      <span className="label-cancel">{title}</span>
    </div>
  );
};

"use client";
import CustomInput from "../../subComponents/input";
import visibleIcon from "../../../public/icons/visible.svg";
import noVisibleIcon from "../../../public/icons/noVisible.svg";
import { updateState } from "../../../utilities/helper";
import { SubmitButton } from "@/subComponents/buttons";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginValidation } from "../../../utilities/validation";
import { Login_Post } from "../../../utilities/apiCall";
import { LOGIN } from "../../../config/endPoints";

const defaultForm = {
  email: "",
  password: "",
};

const defaultError = {
  email: "",
  password: "",
};

const Login = ({ setCookies }: any) => {
  const router = useRouter();
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const { isValid, error }: any = loginValidation(formData);
      if (isValid) {
        const response = await Login_Post(LOGIN, formData);
        const { status, data }: any = response;
        if (status) {
          await setCookies(data);
          toast.success("Login Successful");
          router.push("/admin/dashboard");
          setLoading(false);
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Login Unsuccessful");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col self-stretch gap-6">
      <CustomInput
        title="Email"
        value={formData.email}
        onChange={(val: string) =>
          updateState("email", val, setFormData, setFormError)
        }
        error={formError.email}
        placeholder="example123@gmail.com"
        required
      />
      <CustomInput
        title="Password"
        value={formData.password}
        onChange={(val: string) =>
          updateState("password", val, setFormData, setFormError)
        }
        type={inputType}
        rightIcon={inputType === "text" ? noVisibleIcon : visibleIcon}
        iconClick={handleInputType}
        error={formError.password}
        placeholder="Enter a password"
        required
      />
      <SubmitButton title="Sign In" onClick={handleClick} disabled={loading} />
    </div>
  );
};

export default Login;

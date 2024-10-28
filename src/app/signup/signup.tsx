"use client";
import CustomInput from "../../subComponents/input";
import visibleIcon from "../../../public/icons/visible.svg";
import noVisibleIcon from "../../../public/icons/noVisible.svg";
import { updateState } from "../../../utilities/helper";
import { SubmitButton } from "@/subComponents/buttons";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signupValidation } from "../../../utilities/validation";
import { Signup_Post } from "../../../utilities/apiCall";
import { SIGNUP } from "../../../config/endPoints";

const defaultForm = {
  firstName: "",
  lastName: "",
  mobile: "",
  role: "SUPERADMIN",
  email: "",
  password: "",
};

const defaultError = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const router = useRouter();
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleClick = async () => {
    try {
      const { isValid, error }: any = signupValidation(formData);
      if (isValid) {
        const response = await Signup_Post(SIGNUP, formData);
        const { status, data }: any = response;
        if (status) {
          toast.success("Signed Up Successfully");
          router.push("/login");
          router.refresh();
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      toast.error("Login Unsuccessful");
    }
  };

  return (
    <div className="flex flex-col self-stretch gap-6">
      <CustomInput
        title="Firstname"
        value={formData.firstName}
        onChange={(val: string) =>
          updateState("firstName", val, setFormData, setFormError)
        }
        error={formError.firstName}
        placeholder="Enter firstname"
        required
      />
      <CustomInput
        title="Lastname"
        value={formData.lastName}
        onChange={(val: string) =>
          updateState("lastName", val, setFormData, setFormError)
        }
        placeholder="Enter lastname"
        error={formError.lastName}
        required
      />
      <CustomInput
        title="Mobile"
        value={formData.mobile}
        placeholder="Ex. 9800000000"
        onChange={(val: string) =>
          updateState("mobile", val, setFormData, setFormError)
        }
        error={formError.mobile}
        required
      />
      <CustomInput
        title="Email"
        value={formData.email}
        onChange={(val: string) =>
          updateState("email", val, setFormData, setFormError)
        }
        error={formError.email}
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
        required
      />
      <SubmitButton title="Sign In" onClick={handleClick} />
    </div>
  );
};

export default SignUp;

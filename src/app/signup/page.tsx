import { cookies } from "next/headers";
import { Login_Post } from "../../../utilities/apiCall";
import { LOGIN } from "../../../config/endPoints";
import axios from "axios";
import SignUp from "./signup";

interface loginTypes {
  email: string;
  role: string;
  password: string;
}

const SignUpPage = async () => {
  return (
    <div className="flex justify-center w-screen h-screen bg-[#fcfcfc]">
      <div className="login-box">
        <div className="flex justify-center self-stretch">
          <span className="section-title">Sign In</span>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;

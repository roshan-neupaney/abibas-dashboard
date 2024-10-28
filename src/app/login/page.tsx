import { cookies } from "next/headers";
import Login from "./login";
import { Login_Post } from "../../../utilities/apiCall";
import { LOGIN } from "../../../config/endPoints";
import axios from "axios";

interface loginTypes {
  email: string;
  role: string;
  password: string;
}

const LoginPage = async () => {
  const setCookies = async (data: any) => {
    "use server";
    cookies().set({
      name: "access_token",
      value: "Bearer " + data.access_token,
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    });
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-[#fcfcfc]">
      <div className="login-box">
        <div className="flex justify-center self-stretch">
          <span className="section-title">Sign In</span>
        </div>
        <Login setCookies={setCookies} />
      </div>
    </div>
  );
};

export default LoginPage;

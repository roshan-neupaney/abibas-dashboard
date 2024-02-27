import { cookies } from "next/headers";
import Login from "./login";
import { redirect } from "next/navigation";
import { Login_Post } from "../../../utilities/apiCall";
import { LOGIN } from "../../../config/endPoints";

interface loginTypes {
  email: string;
  role: string;
  password: string;
}

const LoginPage = async () => {
  const handleSubmit = async (form: loginTypes) => {
    "use server";
    // const response = await Login_Post(LOGIN, form)
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((e) => console.error(e));
    // const { status, data }: any = response;
    // if (status) {
    //   cookies().set({
    //     name: "access_token",
    //     value: "Bearer " + data.access_token,
    //     maxAge: 60 * 60 * 24,
    //     httpOnly: true,
    //   });
    // }
      redirect("/admin/dashboard");
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-[#fcfcfc]">
      <div className="login-box">
        <div className="flex justify-center self-stretch">
          <span className="section-title">Sign In</span>
        </div>
        <Login handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;

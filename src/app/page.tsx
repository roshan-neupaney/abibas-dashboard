import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authorization } from "../../hoc/auth";

const page = () => {
  const token = cookies().get('access_token')?.value;
  authorization(token)
  
  // redirect("/admin/dashboard");
};

export default page;

import { redirect } from "next/navigation";
import { DecodeJWT } from "../utilities/helper";
import { cookies } from "next/headers";

export const authorization = (value) => {
  // const {value} = cookies().get('access_token');
  if (!value) {
    redirect("/login");
  } else {
    const decodeToken = DecodeJWT(value);
    const expiryDate = decodeToken.exp * 1000;
    const is_expired = Date.now() > expiryDate;
    if (is_expired) {
      // Redirect to login page
      redirect("/login");
    }
  }
};

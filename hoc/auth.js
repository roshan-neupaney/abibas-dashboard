import { redirect } from "next/navigation";
import { DecodeJWT } from "../utilities/helper";

export const authorization = (value) => {
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

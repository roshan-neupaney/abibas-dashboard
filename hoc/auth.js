import { redirect } from "next/navigation";
import { DecodeJWT } from "../utilities/helper";
import { revalidatePath } from "next/cache";
import clearCachesByServerAction from "../hooks/revalidate";

export const authorization = (value, path = "/") => {
  clearCachesByServerAction(path);
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

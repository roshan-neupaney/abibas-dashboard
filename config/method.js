import axios from "axios";
import { BASE_URL } from "./constants";

export const POST = async (url, payload) => {
  try {
    return await axios.post(BASE_URL + url, payload).then((res) => {
      return res;
    });
  } catch (e) {
    return e.response;
  }
};

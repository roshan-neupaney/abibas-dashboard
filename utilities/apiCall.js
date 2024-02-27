import { POST } from "../config/method";

export const Login_Post = async (url, payload) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await POST(url, payload);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status= true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};

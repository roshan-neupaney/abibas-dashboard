import axios from "axios";
import { BASE_URL } from "./constants";

export const LOGIN_POST = async (url, payload) => {
  try {
    return await axios.post(BASE_URL + url, payload).then((res) => {
      return res;
    });
  } catch (e) {
    return e.response;
  }
};
export const POST = async (url, payload, token) => {
  try {
    return await axios
      .post(BASE_URL + url, payload, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        return res;
      });
  } catch (e) {
    return e.response;
  }
};
export const PATCH = async (url, payload, token) => {
  try {
    return await axios
      .patch(BASE_URL + url, payload, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        return res;
      });
  } catch (e) {
    return e.response;
  }
};
export const POST_FORM = async (url, payload, token) => {
  try {
    return await axios
      .post(BASE_URL + url, payload, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=add-random-characters`,
          Authorization: token,
        },
      })
      .then((res) => {
        return res;
      });
  } catch (e) {
    return e.response;
  }
};
export const PATCH_FORM = async (url, payload, token) => {
  try {
    return await axios
      .patch(BASE_URL + url, payload, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=add-random-characters`,
          Authorization: token,
        },
      })
      .then((res) => {
        return res;
      });
  } catch (e) {
    return e.response;
  }
};

export const SERVER_SIDE_GET = async (token, url) => {
  try {
    return await axios
      .get(
        BASE_URL + url,
        { headers: { Authorization: token } },
      )
      .then((res) => {
        return res;
      });
  } catch (e) {
    return e.response;
  }
};

export const GET = async (url, token) => {
  try {
    return await axios
      .get(BASE_URL + url, { headers: { Authorization: token } })
      .then((res) => {
        return res;
      });
  } catch (e) {
    return e.response;
  }
};
export const DELETE = async (url, token) => {
  try {
    return await axios
      .delete(BASE_URL + url, { headers: { Authorization: token } })
      .then((res) => {
        return res;
      });
  } catch (e) {
    return e.response;
  }
};

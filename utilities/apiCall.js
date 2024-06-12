import { DELETE, GET, LOGIN_POST, PATCH, PATCH_FORM, POST, POST_FORM, SERVER_SIDE_GET } from "../config/method";

export const Login_Post = async (url, payload) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await LOGIN_POST(url, payload);
    const { status, data } = res;
    if (status == 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const ServerSideGet = async (token, url) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await SERVER_SIDE_GET(token, url);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const ServerSideGetWithId = async (token, url, id) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const URL = url + "/" + id;
    const res = await SERVER_SIDE_GET(token, URL);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const ServerSideGetWithParams = async (token, url, params) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const URL = url + "?" + params;
    const res = await SERVER_SIDE_GET(token, URL);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const ClientSideGet = async (url, token) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await GET(url, token);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const JsonPost = async (url, payload, token) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await POST(url, payload, token);
    const { status, data } = res;
    if (status === 201) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const JsonPatch = async (url,id, payload, token) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const URL = url + '/' + id
    const res = await PATCH(URL, payload, token);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const FormdataPost = async (url, payload, token) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await POST_FORM(url, payload, token);
    const { status, data } = res;
    if (status === 201) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data?.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const FormdataPatch = async (url, id, payload, token) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const URL = url + '/' + id;
    const res = await PATCH_FORM(URL, payload, token);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const VechicleImagesPatch = async (url, payload, token) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const res = await PATCH_FORM(url, payload, token);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};
export const DeleteWithId = async (url, id, token) => {
  try {
    const response = {
      data: "",
      status: false,
    };
    const URL = url + '/' + id;
    const res = await DELETE(URL, token);
    const { status, data } = res;
    if (status === 200) {
      response.data = data;
      response.status = true;
    } else {
      response.data = data.message;
      response.status = false;
    }
    return response;
  } catch (e) {
    console.error(e);
  }
};

import Axios from "axios";

export async function getAsync(url, param = {}, language = "vi") {
  try {

    console.log("url  = " , url);
    const response = await Axios.get(url, {
      headers: {
        //'Authorization': 'Bearer 8b68c556-f2e7-46a8-9bd0-b11b3f35d314',
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: param,
    });

    return response;
  } catch (ex) {
    const { status = 400, data = {} } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: {},
      message: error[0]?.message || "",
      code: error[0]?.code || 0,
    };
  }
}

export async function postAsync(url, params = {}) {
  try {
    const response = await Axios.post(url, params);
    console.log("response: " ,response)
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}
export async function postAsyncWithHeader(url, params = {}, header = {}) {
  try {
    const response = await Axios.post(url, {}, {
      headers: header,
      params: params,
    });
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}
import axios from "axios";

import { API_KEY } from "../constants/environment";

export async function getNewsFunction(accessToken) {
  try {
    const response = await axios.get(API_KEY + "/news", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

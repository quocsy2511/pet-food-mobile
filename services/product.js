import axios from "axios";

import { API_KEY } from "../constants/environment";

export async function getAllProduct(accessToken) {
  try {
    const response = await axios.get(API_KEY + "/product", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}


export async function getProductByIdFunction(id, accessToken) {
  try {
    const response = await axios.get(API_KEY + `/product/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

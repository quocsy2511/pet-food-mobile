import axios from "axios";

import { API_KEY } from "../constants/environment";

export async function getAllBird(accessToken) {
  try {
    const response = await axios.get(API_KEY + "/bird", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function getBirdByIdFunction(birdId, accessToken) {
  try {
    const response = await axios.get(API_KEY + `/bird/${birdId}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

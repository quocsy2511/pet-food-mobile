import axios from "axios";

import { API_KEY } from "../constants/environment";

export async function getOrderByStatus(accessToken, status) {
  try {
    const response = await axios.get(
      API_KEY + `/order/customer?status=${status}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function cancelOrder(accessToken, orderId) {
  try {
    const response = await axios.delete(API_KEY + `/order/cancel/${orderId}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function repaymentOrder(accessToken, orderId) {
  try {
    const response = await axios.post(
      API_KEY + `/payment/re-payment/${orderId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

import axios from "axios";

import { API_KEY } from "../constants/environment";

async function getProvinces() {
  try {
    const response = await axios.get(API_KEY + "/delivery/province");
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

async function getDistricts(provinceId) {
  try {
    const response = await axios.get(
      API_KEY + "/delivery/district?province_id=" + provinceId
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

async function getWards(districtId) {
  try {
    const response = await axios.get(
      API_KEY + "/delivery/ward?district_id=" + districtId
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

async function calcDeliveryFee(districtId, wardCode) {
  try {
    const response = await axios.post(API_KEY + "/delivery/fee", {
      wardCode: wardCode,
      districtId: districtId,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export { getProvinces, getDistricts, getWards, calcDeliveryFee };

import axios from "axios";

import { API_KEY } from "../constants/environment";

export async function getAllMeal(accessToken) {
  try {
    const response = await axios.get(API_KEY + "/meal", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function getMealByIdFunction(id, accessToken) {
  try {
    const response = await axios.get(API_KEY + `/meal/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function sendMealOrder(orderInfo, orderMeals, accessToken) {
  try {
    const response = await axios.post(
      API_KEY + "/order",
      {
        name: orderInfo.fullname,
        phone: orderInfo.phoneNumber,
        shippingAddress: orderInfo.address,
        shippingProvinceCode: orderInfo.province,
        shippingDistrictCode: orderInfo.district,
        shippingWardCode: `${orderInfo.ward}`,
        shippingFee: orderInfo.shippingFee,
        paymentType: orderInfo.paymentMethod,
        meals: orderMeals,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function getAllMealCustomerFunction(accessToken) {
  try {
    const response = await axios.get(API_KEY + "/meal/customer", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function getMealsByBirdIdFunctions(idBird, accessToken) {
  try {
    const response = await axios.get(API_KEY + `/meal/bird/${idBird}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function createCustomerMeal(data, accessToken) {
  try {
    const response = await axios.post(
      API_KEY + "/meal/create",
      {
        title: data.title,
        description: data.description,
        birdId: data.bird.id,
        image: data.image,
        sections: data.productMeals,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function updateCustomerMeal(mealId, accessToken) {
  try {
    const response = await axios.put(
      API_KEY + `/meal/status/${mealId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function saveCustomerMeal(data, accessToken) {
  try {
    const response = await axios.put(
      API_KEY + "/meal/update",
      {
        id: data.id,
        status: true,
        title: data.title,
        description: data.description,
        birdId: data.bird.id,
        image: data.image,
        sections: data.productMeals,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

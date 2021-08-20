import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
} from "../constants/productConstants"

import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL

function arrayToQueryString(params) {
  return Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&")
}

export const getProducts =
  (page = 1, perPage = 5) =>
  async (dispatch) => {
    dispatch({ type: PRODUCTS_REQUEST })

    let params = { perPage, page }

    let qParams = arrayToQueryString(params)

    try {
      const resp = await axios.get(API_URL + "/products/?" + qParams)

      dispatch({
        type: PRODUCTS_SUCCESS,
        payload: resp.data.products,
      })
      //console.log(resp)
    } catch (error) {
      dispatch({
        type: PRODUCTS_FAIL,
        payload: "Connection error",
      })
    }
  }

import produce from "immer"
import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
} from "../constants/productConstants"

const INITIAL_STATE = {
  data: [],
  loding: false,
}

export const productReducers = produce((draft, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      draft.loding = true
      draft.data = []
      break
    case PRODUCTS_SUCCESS:
      draft.loading = false
      draft.data = action.payload.data
      draft.lastPage = action.payload.last_page
      draft.page = action.payload.current_page
      draft.total = action.payload.total
      draft.perPage = action.payload.per_page
      break
    case PRODUCTS_FAIL:
      draft.loading = false
      draft.error = action.payload
    default:
      return
  }
}, INITIAL_STATE)

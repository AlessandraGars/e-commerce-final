import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import getConfig from '../../utils/getConfig'

export const carProductsSlice = createSlice({
  name: 'carProducts',
  initialState: [],
  reducers: {
    setCarItems: (state, action) => {
      return action.payload
    },
  },
})

export const getCarThunk = () => (dispatch) => {
  axios
    .get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
    .then((resp) => dispatch(setCarItems(resp.data)))
    .catch((error) => console.error(error))
}

export const addCartItemThunk = (data) => (dispatch) => {
  axios
    .post(
      'https://e-commerce-api-v2.academlo.tech/api/v1/cart',
      data,
      getConfig()
    )
    .then((resp) => dispatch(getCarThunk()))
    .catch((error) => console.error(error))
}

export const deleteCartThunk = (id) => (dispatch) => {
  axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
    .then((resp) => {
      dispatch(getCarThunk())
    })
    .catch((error) => {
      console.log(error)
    })
}

export const updateCartThunk = (id, data) => (dispatch) => {
  axios
    .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, data, getConfig())
    .then(() => {
      dispatch(getCarThunk())
    })
    .catch((error) => {
      console.log(error)
    })
}

export const carCheckoutThunk = () => (dispatch) => {
  axios
    .post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {}, getConfig())
    .then((resp) => {
      dispatch(getCarThunk())
      alert('The purchase has been processed successfully.')
    })
    .catch((error) => {
      console.log(error)
    })
}

export const { setCarItems } = carProductsSlice.actions

export default carProductsSlice.reducer

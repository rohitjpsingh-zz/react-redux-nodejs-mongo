import axios from "axios";
import { setAlert } from './alert';


import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCT_ERROR,
  DELETE_PRODUCT,
} from "./types";

// Get Products
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/product");

    dispatch({ type: GET_PRODUCTS, payload: res.data.products });
  } catch (err) {
    console.log("errr",err);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Product
export const addProduct = (formData,config) => async (dispatch) => {

  try {
    const res = await axios.post("http://localhost:4000/product/add", formData, config);

    dispatch({ type: ADD_PRODUCT, payload: res.data.product });

    dispatch(setAlert('Product Created', 'success'));

  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Single Product
export const getProduct = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:4000/product/edit/${id}`);
  
      dispatch({ type: GET_PRODUCT, payload: res.data.product });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/product/delete/${id}`);

    dispatch({ type: DELETE_PRODUCT, payload: id });

    dispatch(setAlert('Product Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Product
export const updateProduct = (id,formData,config) => async (dispatch) => {

  try {
    const res = await axios.post(`http://localhost:4000/product/update/${id}`, formData, config);

    dispatch({ type: UPDATE_PRODUCT, payload: res.data.product });

    dispatch(setAlert('Product Updated', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

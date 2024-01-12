import React from "react";
import useAxios from "./useAxios";

import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  blogsSuccess,
  detailSuccess,
  catSuccess,
  usersSuccess,
} from "../features/blogSlice";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getBlogs = async (url) => {
    console.log("getblog");
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}/`);
      console.log(data);

      dispatch(blogsSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const getDetail = async (url) => {
    console.log("getdetail");
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}/`);
      console.log(data);

      dispatch(detailSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const postBlogs = async (url, newBlog) => {
    dispatch(fetchStart());
    try {
      const {data}= await axiosWithToken.post(`${url}/`, newBlog ); 
      toastSuccessNotify("Operation succes");
      getBlogs(url);
      dispatch(blogsSuccess({data,url}))
    } catch (error) {
      dispatch(fetchFail());
     
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
      console.log(error);
    }
  };
  const getCategories = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}/`);
      console.log(data);

      dispatch(catSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
   
  };
  const deleteBlog = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify("Operation succes");
      getBlogs(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not success")
    }
  };

  const getUser = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}`);
      console.log(data);

      dispatch(usersSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const putBlog = async (url,body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${body._id}`,body);
      getBlogs(url);
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  

  return { getBlogs, getDetail, postBlogs,getCategories,deleteBlog,getUser,putBlog};
};

export default useBlogCalls;


// 6982a2ceb324adc67ad9dc41af71ff92c0cb7a0c8a9d44911be779a1910b018c

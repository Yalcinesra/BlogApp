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
  commentSuccess,
  userBlogSuccess,
} from "../features/blogSlice";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();
  //! Blog
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
  //! Detail
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
  //! newBlog
  const postBlogs = async (url, newBlog) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`${url}/`, newBlog);
      toastSuccessNotify("Operation succes");
      getBlogs(url);
      dispatch(blogsSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
      console.log(error);
    }
  };
  //! Categories
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
  //! Delete
  const deleteBlog = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify("Operation succes");
      getBlogs(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
    }
  };
  //! User
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
  //! Blog Update
  const putBlog = async (url, body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${body._id}`, body);
      getDetail(`${url}/${body._id}`);
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  //! Comment
  const getComment = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}/`);
      console.log("comment", data);
      dispatch(commentSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  //! newComment
  const postComment = async (url, infoComment) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`${url}/`,infoComment);
      toastSuccessNotify("Operation succes");
      getDetail(`blogs/${infoComment.blogId}`);
    
      dispatch(commentSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
      console.log(error);
    }
  };
  //! userBlog MyBlog
  const getUserBlog = async (id) => {
   
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`${id}`);
      console.log(data);
      dispatch(userBlogSuccess({ data,id }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    } };
  //! like
  const postLike = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`${url}/`);
      toastSuccessNotify("Operation succes");
      getBlogs("blogs");
      
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
      console.log(error);
    }
  };
  
 
  return {
    getBlogs,
    getDetail,
    postBlogs,
    getCategories,
    deleteBlog,
    getUser,
    putBlog,
    getComment,
    postComment,
    postLike,
    getUserBlog,
  };
};

export default useBlogCalls;

// 6982a2ceb324adc67ad9dc41af71ff92c0cb7a0c8a9d44911be779a1910b018c

import React from "react";
import { useSelector } from "react-redux";

import BlogCard from "../components/blog/BlogCard";
import useBlogCalls from "../hooks/useBlogCalls";
import { Container, Grid } from "@mui/material";
import { useEffect } from "react";

const intialState = {
  categoryId: "",
  title: "",
  content: "",
  image: "",
  isPublish: true,
  likes:[],
  countOfVisitors:0,
  comments:[],
};

function MyDashboard() {
    const { blogs } = useSelector((state) => state.blog);
  const { getBlogs } = useBlogCalls();


  const [info, setInfo] = React.useState(intialState);
  useEffect(() => {
    getBlogs("blogs");
    console.log("dashboard");
  }, []);
  console.log(blogs);
  return (
    <>
      <Container maxWidth={"xl"}>
        <Grid container spacing={2} mt={3}>
          {blogs?.data?.map((blog) => (
            <Grid key={blog.categoryId} item xs={12} md={6} lg={4} xl={3}>
              <BlogCard {...blog} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MyDashboard;

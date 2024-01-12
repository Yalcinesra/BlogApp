import React from "react";
import { Card, CardHeader, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useBlogCalls from "../hooks/useBlogCalls";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const NewBlog = () => {
  const initialValue = {
    title: "",
    image: "",
    categoryId: "",
    status: "",
    content: "",
  };
  const [newBlog, setNewBlog] = useState(initialValue);
  const handleChange = (e) => {
    
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value }); 
  };
  

  const { categories } = useSelector((state) => state.blog);

  const { postBlogs, getCategories } = useBlogCalls();
  const handleSubmit = (e) => {
    e.preventDefault();
    postBlogs("blogs", newBlog);
    setNewBlog(initialValue);
    console.log(newBlog);
  };
  useEffect(() => {
    getCategories("categories");
  }, []);

  console.log(categories);
  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
      <Card
        sx={{
          width: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          boxShadow: 20,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <CardHeader title="New Blog" />
          <TextField
            label="Title*"
            name="title"
            id="title"
            type="text"
            variant="outlined"
            value={newBlog.title}
            onChange={handleChange}
          />
          <TextField
            label="Image URL*"
            name="image"
            id="image"
            type="text"
            variant="outlined"
            value={newBlog.image}
            onChange={handleChange}
          />
          <FormControl fullWidth>
  <InputLabel id="status">Categories</InputLabel>
          <Select
                labelId="demo-simple-select-category"
                id="categoryId"
                name="categoryId"
                value={newBlog.categoryId}
                label="Category Name"
                onChange={handleChange}
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
                
              </Select></FormControl>
              <FormControl fullWidth>
  <InputLabel id="status">Status</InputLabel>
          <Select

            id="status"
            name="status"
            value={newBlog.status}
            label="Status*"
            onChange={handleChange}
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="publisched">Publisched</MenuItem>
          </Select></FormControl>
          <TextField
            label="Content*"
            name="content"
            id="content"
            type="text"
            variant="outlined"
            value={newBlog.content}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">
            New Blog
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default NewBlog;

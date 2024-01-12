import { Box, Button, Card, CardHeader, MenuItem, Modal, Select, TextField } from '@mui/material';
import React from 'react'
import useBlogCalls from '../../hooks/useBlogCalls';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateModal = ({ open, handleClose,detail}) => {
  const { _id } = useParams();
  const { putBlog,getCategories } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);
  console.log(detail);
  const [info,setInfo]=useState(detail)
  const handleSubmit = (e) => {
    e.preventDefault();
      putBlog("blogs",info)
     
    handleClose();
  };
  const handleChange = (e) => {
    console.log(e.target.id);
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
console.log(info);
  useEffect(() => {
    getCategories("categories");
  }, []);
console.log(categories);
  return (
    <div>
    <Modal
     open={open}
        onClose={handleClose}>
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
          <CardHeader title="Update Blog" />
          <TextField
            label="Title*"
            name="title"
            id="title"
            type="text"
            variant="outlined"
            value={info.title}
            onChange={handleChange}
          />
          <TextField
            label="Image URL*"
            name="image"
            id="image"
            type="text"
            variant="outlined"
            value={info.image}
            onChange={handleChange}
          />
          <Select
                labelId="demo-simple-select-category"
                id="categoryId"
                name="categoryId"
                value={info.categoryId}
                label="Category Name"
                onChange={handleChange}
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
                
              </Select>

          <Select
            id="status"
            name="status"
            value={info.status}
            label="Status*"
            onChange={handleChange}
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="publisched">Publisched</MenuItem>
          </Select>
          <TextField
            label="Content*"
            name="content"
            id="content"
            type="text"
            variant="outlined"
            value={info.content}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">
            Update Blog
          </Button>
        </Box>
      </Card>

    </Box>
    </Modal>
    </div>
  )
}

export default UpdateModal
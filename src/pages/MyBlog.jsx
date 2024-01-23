import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Avatar, Box, Button, Grid } from "@mui/material";

import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../components/blog/UpdateModal";





export default function MyBlog() {
  

 

 
 
 
  const { _id} = useSelector((state) => state.auth);
  const {currentUser} = useSelector((state) => state.auth);
  const { userBlog } = useSelector((state) => state.blog);
  const {detail } = useSelector((state) => state.blog);




  const { deleteBlog, getUserBlog } = useBlogCalls();

 

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserBlog(`blogs?author=${_id}`);
    
  }, []);

  

  
console.log(_id);
console.log(userBlog?.data);

  
  const navigate = useNavigate();

  return (
    <Box>
    {userBlog?.data?.map((blog) => (
    <Box key={blog._id}sx={{ display: "flex", justifyContent: "center", margin:2}}>
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader title={blog?.title} />
        <CardMedia
          component="img"
          height="200"
          image={blog?.image}
          alt="image"
        />
        <Box sx={{ margin: 3, display: "flex" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          <Typography variant="body2" color="text.secondary" margin={1}>
            {currentUser}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" margin={2}>
          {new Date(blog?.updatedAt).toLocaleString()}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {blog?.content}
          </Typography>
        </CardContent>

        <Box display="flex" justifyContent="between">
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                sx={{
                  color: `${
                    blog?.likes?.filter((like) => like === users?._id)
                      .length > 0
                      ? "red"
                      : "gray"
                  }`,
                }}
              />
              {blog?.likes?.length}
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              onClick={()=>setOpenComment(!openComment)}
            >
              <ChatBubbleOutlineIcon />
              {blog?.comments?.length}
            </IconButton>
            <IconButton aria-label="add to favorites">
              <VisibilityIcon />
              {blog?.countOfVisitors}
            </IconButton>
          </CardActions>
          <CardActions
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          ></CardActions>
        </Box>


        {blog.userId === _id  && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="success" onClick={handleOpen}>
              UpDate
            </Button>
            <UpdateModal
              open={open}
              handleClose={handleClose}
              detail={detail}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => {deleteBlog("blogs", _id) + navigate("/" )}}
            >
              Delete
            </Button>
          </Box>
        )}
      </Card>
    </Box>))}
    </Box>
  );
}

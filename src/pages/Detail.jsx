import * as React from "react";

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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import UpdateModal from "../components/blog/UpdateModal";
import CommentForm from "../components/blog/CommentForm";




export default function Detail() {
  

 


  const { _id } = useParams();
  const { _id:userId } = useSelector((state) => state.auth);

  const { detail } = useSelector((state) => state.blog);
  

 
  const { getDetail, deleteBlog,getBlogs, getUser,postLike} = useBlogCalls();

  const [openComment, setOpenComment] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDetail("blogs/" + _id);
 
  }, []);

  const handleLikeClick = () => {
    
    postLike( `blogs/${_id}/postLike`,_id)
   
};
  // console.log(userId);
console.log(detail?.categoryId?.name);
console.log(detail);
console.log(userId);


  // console.log( users?._id);
  
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin:2 }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader title={detail?.title} />
        <CardMedia
          component="img"
          height="300"
          image={detail?.image}
          alt="image"
        />
        <Box sx={{ margin: 3, display: "flex" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          <Typography variant="body2" color="text.secondary" margin={1}>
            {detail?.userId?.username}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" margin={2}>
          {new Date(detail?.updatedAt).toLocaleString()}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {detail?.categoryId?.name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {detail?.content}
          </Typography>
        </CardContent>

        <Box display="flex" justifyContent="between">
          <CardActions>
          <IconButton  aria-label="add to favorites">
            <FavoriteIcon onClick={handleLikeClick} sx={{
                  color: `${
                   
                    detail.likes?.filter((like) => like ===userId).length > 0
                      ? "red"
                      : "gray"
                  }`,
                }} /> {detail?.likes?.length }
           
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              onClick={()=>setOpenComment(!openComment)}
            >
              <ChatBubbleOutlineIcon />
              {detail?.comments?.length}
            </IconButton>
            <IconButton aria-label="add to favorites">
              <VisibilityIcon />
              {detail?.countOfVisitors}
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
        {openComment===true && 
        <CommentForm detail={detail}/> 
        
        
      }

        {detail?.userId?._id === userId && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, margin:2}}>
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
    </Box>
  );
}

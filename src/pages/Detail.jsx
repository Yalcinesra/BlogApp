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
import { Avatar, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { current } from "@reduxjs/toolkit";
import UpdateModal from "../components/blog/UpdateModal";
import CommentForm from "../components/blog/CommentForm";



export default function Detail() {
  

  const [blogDetail, setBlogDetail] = useState();
  //  const{title,content,image}=blogDetail;


  const { _id } = useParams();
  // const { currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.blog);
  const { detail } = useSelector((state) => state.blog);

  const { getDetail, deleteBlog, getUser } = useBlogCalls();

  const [openComment, setOpenComment] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDetail("blogs/" + _id);
    getUser("users/" + _id);
  }, []);

  console.log(detail?.likes);

  // console.log( users?._id);
  console.log(detail?.userId?.username);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader title={detail?.title} />
        <CardMedia
          component="img"
          height="300"
          image={detail?.image}
          alt="Paella dish"
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
            {detail?.content};
          </Typography>
        </CardContent>

        <Box display="flex" justifyContent="between">
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                sx={{
                  color: `${
                    detail?.likes?.filter((like) => like === users?._id)
                      .length > 0
                      ? "red"
                      : "gray"
                  }`,
                }}
              />
              {detail?.likes?.length}
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
        {openComment===true && <CommentForm detail={detail} />}

        {detail?.userId?._id === users?._id && (
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
              onClick={() => deleteBlog("blogs", _id)}
            >
              Delete
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}

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
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { current } from "@reduxjs/toolkit";
import UpdateModal from "../components/blog/UpdateModal";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Detail() {
  const [expanded, setExpanded] = React.useState(false);

  const [blogDetail, setBlogDetail] = useState();
  //  const{title,content,image}=blogDetail;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { _id } = useParams();
  const { currentUser} = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.blog);
  const { detail } = useSelector((state) => state.blog);

  const { getDetail, deleteBlog, getUser } = useBlogCalls();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
 
  useEffect(() => {
    getDetail("blogs/" + _id);
    getUser("users/" + _id);
  }, []);
 
  // console.log(detail.userId._id);
  // console.log(users._id);
  const navigate = useNavigate(); 
  const [info,setInfo]=useState({title:detail.title,image:detail.image,category:detail.category,content:detail.content})
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader title={detail.title} />
        <CardMedia
          component="img"
          height="300"
          image={detail.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {detail.content};
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {detail.content};
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="between">
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <ChatBubbleOutlineIcon />
            <VisibilityIcon />
            {detail.countOfVisitors}
          </CardActions>
          <CardActions
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          ></CardActions>
        </Box>
        
        {
          {/* detail.userId._id === users._id  */}
          && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="success" onClick={handleOpen}>
              UpDate
            </Button>
            <UpdateModal
              open={open}
              handleClose={handleClose}
              detail={detail}
              info={info}
              setInfo={setInfo}
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

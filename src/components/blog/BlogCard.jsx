import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useBlogCalls from "../../hooks/useBlogCalls";

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

export default function BlogCard({
  _id,
  title,
  content,
  image,
  likes,
  countOfVisitors,
  comments,
  updatedAt,
}) {
  const { _id:userId} = useSelector((state) => state.auth);
  const { postLike} = useBlogCalls();
 
  const handleLikeClick = () => {
    
      postLike(`blogs/${_id}/postLike`)
  };

  const navigate = useNavigate();
 
  return (
    <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
      { new Date(updatedAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content.substring(0, 100)}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="between">
        <CardActions>
          <IconButton  aria-label="add to favorites">
            <FavoriteIcon onClick={handleLikeClick} sx={{
                  color: `${
                   
                    likes?.filter((like) => like ===userId).length > 0
                      ? "red"
                      : "gray"
                  }`,
                }} /> {likes.length }
           
            </IconButton>
          <IconButton aria-label="add to favorites">
    
          <ChatBubbleOutlineIcon/>{comments.length} 
          </IconButton>
          <IconButton aria-label="add to favorites">
          <VisibilityIcon />{countOfVisitors}
          </IconButton>
          
          <Button variant="contained" onClick={() => navigate("detail/" + _id )}>
            Read More
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

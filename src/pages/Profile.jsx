import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { _id} = useSelector((state) => state.auth);
  
  const { users} = useSelector((state) => state.blog);

  const { getUser } = useBlogCalls();

  useEffect(() => {
    getUser("users/" + _id);
  
  }, []);
 
console.log(users?.username);
console.log(_id);
  return (
    <Box  display="flex" justifyContent="center"  alignContent="center">
    <Card sx={{ maxWidth: 500, margin:2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={users?.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {users?.firstName} {users?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {users.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>
  );
}

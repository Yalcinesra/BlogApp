import React from 'react'
import { useSelector } from 'react-redux';
import useBlogCalls from '../../hooks/useBlogCalls';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, Card, CardHeader, Container, Grid, Modal, TextField } from '@mui/material';
import CommentCard from './CommentCard';

const CommentForm = ({ detail}) => {
    const initialValue = {
        
            blogId:"",
            comment:"",
          
      };
    const { _id } = useParams();
  const { comments} = useSelector((state) => state.blog);
  const { getComment,postComment } = useBlogCalls();
  const [infoComment,setInfoComment]=useState(comments)
  useEffect(() => {
    getComment("comments/" + _id);
  }, []);
  console.log(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
      postComment("comments",infoComment)
      setInfoComment(initialValue);
   
  
  };
console.log(infoComment);
  console.log("comment", comments);
  const handleChange = (e) => {
    console.log(e.target.id);
    setInfoComment({ ...infoComment, [blogId]: _id, [e.target.id]:e.target.value });
  };
  return (
    <div>
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
         <CardHeader title="Comment" />
         <TextField
           label="Comment"
           name="comment"
           id="comment"
           type="text"
           variant="outlined"
           value={infoComment?.comment}
           onChange={handleChange}
         />
         <Button type="submit" variant="contained">
          Add Comment
         </Button>
       </Box>
     </Card>
     <Container maxWidth={"xl"}>
        <Grid container spacing={2} mt={3}>
          {comments?.map((item) => (
            <Grid key={item._id} >
              <CommentCard {...item} setInfoComment={setInfoComment} />
            </Grid>
          ))}
        </Grid>
      </Container>

   </Box>
   
  </div>
  )
}

export default CommentForm
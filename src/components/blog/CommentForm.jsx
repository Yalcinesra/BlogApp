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
  const [comment,setComment]=useState("")
 

  const handleSubmit = (e) => {
    e.preventDefault();
      postComment("comments",{blogId:_id,comment})
    
    
    };


console.log("comment", comments);

 
  return (
    <div>
        <Box sx={{ display: "flex", justifyContent: "center",alignItems:"center", margin: 2 }}>
     <Card
       sx={{
         width: 5000 ,
         display: "flex",
         flexDirection: "column",
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
         <CardHeader title="Add Comment" />
         <TextField
           label="Comment"
           name="comment"
           id="comment"
           type="text"
           variant="outlined"
           value={comment}
           onChange={(e)=>setComment(e.target.value)}
         />
         <Button type="submit" variant="contained">
          Add Comment
         </Button>
       </Box>
       <Box  sx={{display: "flex", justifyContent: "center",alignItems:"center" }}>
     
     
        <Grid container spacing={2} mt={3}>
          {detail?.comments?.map((item) => (
            <Grid key={item._id} >
              <CommentCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>

     </Card>
     
   </Box>
   
  </div>
  )
}

export default CommentForm
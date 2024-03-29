import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'


const CommentCard = ({userId,createdAt,comment}) => {
  
  return (
    <div>
    <Card sx={{ Width: 300, margin:2 }}>
          <CardHeader
            title="Commnet"
          />
          <CardContent>
      <Typography variant="body2" color="text.secondary">
{userId?.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
{new Date(createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
{comment}
      </Typography>
      </CardContent>
    </Card></div>
  )
}

export default CommentCard
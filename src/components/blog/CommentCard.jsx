import React from 'react'


const CommentCard = ({userId,createdAt,comment}) => {
  
  return (
    <div><Card sx={{ maxWidth: 345 }}>
          <CardHeader
            title="Commnet"
          />
          <CardContent>
      <Typography variant="body2" color="text.secondary">
{userId?.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
{createdAt}
      </Typography>
      <Typography variant="body2" color="text.secondary">
{comment}
      </Typography>
      </CardContent>
    </Card></div>
  )
}

export default CommentCard
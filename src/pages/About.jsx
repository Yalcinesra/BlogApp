import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../assets/Profil.png"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import { Box } from '@mui/material';
export default function About() {
 
 
  
  return (
    <Box  display="flex" justifyContent="center"  alignContent="center">
    <Card   display="flex" justifyContent="center"  alignItem="center"  textAlign="center" sx={{ width: 400, padding:2, boxShadow: 20 }}>
      <CardMedia
       component="img"
        sx={{ height: 150, width:200,margin:"auto", textAlign:"center"}}
        image={image}
       
       
      />
      
      <CardContent sx={{ textAlign:"center"}}>
        <Typography gutterBottom variant="h5" component="div">
          Esra Yalcin
        </Typography>
        <Typography gutterBottom variant="h6" component="div">Fullstack Developer</Typography>
        <Typography variant="body2" color="text.secondary">
        I am a graduate of University
          Computer Systems teaching and worked as an information technologies
         teacher for 8 years. I also learned to use important web development tools such as HTML, CSS, PHP, ASPnet, C# and Photoshop.
          Throughout my career, I have gained various experiences in computer
           technologies and computing. 
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent:"center", alignItems:"center"  }}>
        <Button  href="https://www.linkedin.com/in/esra--yalcin"
              target="true" size="small" ><LinkedInIcon/></Button>
        <Button href="https://github.com/Yalcinesra"
              target="true" size="small" ><GitHubIcon/></Button>
        <Button href="mailto:gutekinder5@gmail.com"
              target="true" size="small" ><MailIcon/></Button>
      </CardActions>
    </Card>
    </Box>
  );
}

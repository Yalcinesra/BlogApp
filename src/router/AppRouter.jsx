import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import NewBlog from "../pages/NewBlog";
import About from "../pages/About";
import Detail from "../pages/Detail";
import MyNavbar from "../components/MyNavbar"
import Footer from "../components/Footer";
import Profile from "../pages/Profile";
import UpdateBlog from "../components/blog/UpdateModal";
const AppRouter = () => {
  return (
    <Router>
    <MyNavbar/>
      <Routes>
      
        <Route path="/" element={<Dashboard />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="newblog" element={<NewBlog />} />
        <Route path="updateBLog" element={<UpdateBlog />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />        
        <Route path="detail/:_id" element={<Detail />} /> 
        <Route path="" element={<PrivateRouter />}>
        
        
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default AppRouter;

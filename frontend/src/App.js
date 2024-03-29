import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Landing from "./pages/Landing/Landing";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Feed from "./components/FeedComponent/Feed2";
import Messenger from "./messenger/Messenger";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "./Context/AuthContext";
import ForgotPassword from "./pages/forgetPassword/forgotPassword";
import ResetPassword from "./pages/resetPassword/resetPassword";
import UserProfile from './pages/Profile Others/Profile'
import VerifyUserMail from "./pages/verifyUserMail/verifyUserMail";

function App() {
  // const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/feed" element={<Feed />}></Route>
        <Route exact path="/messenger" element={<Messenger />}></Route>
        <Route exact path = "/forgotPassword" element={<ForgotPassword/>}></Route>
        <Route exact path = "/resetpassword/:token" element={<ResetPassword/>}></Route>
        <Route exact path = "/userprofile" element={<UserProfile/>}></Route>
        <Route exact path = "/verifiedUserMail/:email" element={<VerifyUserMail/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

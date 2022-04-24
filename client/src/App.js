import "./App.css";
import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import MainNotes from "./components/MyNotes/MainNotes";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/notes" element={<MainNotes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>        
      </main>
      <Footer />
    </>
  );
}

export default App;

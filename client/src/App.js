import NavBar from "./components/navbar/NavBar"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./components/context/Context";
import About from "./pages/about/About";

function App() {
  const {user}= useContext(Context);
  return (
    <div className="App">
      <Router>
      <NavBar/>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={user ? <Home/> : <Register/>} path="/register"/>
        <Route element={user ? <Home/> : <Login/>} path="/login"/>
        <Route element={user ? <Write/> : <Register/>} path="/write"/>
        <Route element={user ? <Settings/> : <Register/>} path="/settings"/>
        <Route element={<Single/>} path="/post/:postId"/>
        <Route element={<About/>} path="/about"/>
      </Routes>
      </Router>

    </div>
  );
}

export default App;

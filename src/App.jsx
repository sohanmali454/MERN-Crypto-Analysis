import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/" Component={SignIn}></Route>
          <Route path="/" Component={SignUp}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/about" Component={About}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

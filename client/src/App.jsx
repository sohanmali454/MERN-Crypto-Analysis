import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./componants/Header";
import CoinPage from "./pages/HomeCoin";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" Component={Home} exact></Route>
          <Route path="/coins/:id" Component={CoinPage}></Route>
          <Route path="/signIn" Component={SignIn}></Route>
          <Route path="/signUp" Component={SignUp}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/about" Component={About}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

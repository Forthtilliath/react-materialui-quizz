import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

export function Layout() {
  return (
    <>
      <div
        className="app"
        style={{ backgroundImage: "url(/assets/images/ques1.png" }}
      >
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

import "./Template.css";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Template = () => {
  return (
    <div className="layout">
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default Template;

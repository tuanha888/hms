import React from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Landing />
      <Services />
      <AboutUs />
    </div>
  );
};

export default Home;

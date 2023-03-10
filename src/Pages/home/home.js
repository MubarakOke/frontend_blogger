import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbar";


const Home = () => {
  const [hamburger, setHamburger] = React.useState(0)

  return (
    <div>
      {/* --------------Navigation begins------------------ */}
      <Navbar
        title="Home"
        hamburger={hamburger}
        setHamburger={setHamburger}
      /> 
      {/* --------------Navigation ends------------------ */}
      {/* --------------Blurring div starts------------------ */}
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
      {/* --------------page content starts------------------- */}
        <div className="font-[Roboto]">
          <Outlet />
        </div>
      {/* --------------page content ends------------------- */}
        </div>
        </div>
      {/* --------------Blurring div ends------------------ */}
    </div>
  );
};

export default Home;

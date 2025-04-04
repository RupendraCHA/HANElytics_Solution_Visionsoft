import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import "./Home.css";
import { StoreContext } from "../../context/StoreContext";
import Footer from "../../components/Footer/Footer";

function Home() {
  const { token, username,url } = useContext(StoreContext);
  const navigate = useNavigate();

  const startTheServer = async () => {
    const response = await axios.get( url);
    console.log(response.data.message)

}
useEffect(() => {
    startTheServer()
    const jwtToken = localStorage.getItem("token")
    if (jwtToken) {
        navigate("/home")
    }else {
        navigate("/login")
    }
},[])

  return (
    <>
      <Header />
      <div className="home-bg">
        <div className="right">
          <h1 className="simplify-heading">
            Simplify AI/ML predictions effortlessly with HANElytics.
          </h1>
          <Link to="/dataModeling" style={{ textDecoration: "none" }}>
            <button className="button">
              Start Viewing Data Model Insights and Work with Migration of Data
            </button>
          </Link>
          <b>*Click here</b>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;

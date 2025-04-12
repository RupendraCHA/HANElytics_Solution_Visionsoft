import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./initialPage.css";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { AiTwotoneDatabase } from "react-icons/ai";
import { FaFile } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import { assets } from "../../assets/assets";

function InitialPage() {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [featureUniqueId, setFeatureUniqueId] = useState(0);

  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message);
  };
  useEffect(() => {
    startTheServer();
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  const handleIsMenuOpened = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  const keyFeatures = [
    {
      featureId: 1,
      title: "AI/ML Model predictions Integration",
      description:
        "Access powerful prediction models results tailored for inventory management, clinical insights, equipment failure, and demand sensing etc...",
    },
    {
      featureId: 2,
      title: "Integrated Dashboards (Power BI)",
      description:
        "No need to switch tools — access dynamic Power BI dashboards embedded right into the platform. Drill down, explore trends, and visualize your data instantly.",
    },
    {
      featureId: 3,
      title: "Tabular Insights",
      description:
        "Predicted results are displayed in a clean, structured table format, showcasing each key metric individually for easy review and interpretation.",
    },
    {
      featureId: 4,
      title: "Data Visualization",
      description:
        "Grasp complex insights easily with interactive charts—bar graphs, pie charts which are designed for intuitive analysis.",
    },
    {
      featureId: 5,
      title: "One-click Excel Export",
      description:
        "Export model insights and results in Excel format for offline use, reporting, and deeper analysis.",
    },
  ];

  const modelsOverview = [
    {
      modelId: 1,
      title: "1. Inventory Reorder Point & Safety Stock Prediction",
      description:
        "Predict optimal reorder points and safety stock levels using AI/ML to prevent stockouts or overstock situations—improving supply chain efficiency.",
        image: `${assets.Inventory_model}`
    },
    {
        modelId: 2,
      title: "2. Revenue & Demand Sensing for Pharmaceuticals",
      description:
        "Forecasts revenue generation based on market behavior, seasonal trends, and historical sales data to get insight on which category giving more profits.",
        image: `${assets.Clinical_model}`
    },
    {
        modelId: 3,
      title: "3. Medical Equipment Risk Detection & Failure Prevention",
      description:
        "Predicted results are displayed in a clean, structured table format, showcasing each key metric individually for easy review and interpretation.",
        image: `${assets.Equipment_model}`
    },
    {
        modelId: 4,
      title: "4. Clinical Drug Demand & Safety Stock Forecasting",
      description:
        "Ensure availability of critical clinical medicines by forecasting demand and recommending adequate buffer stock levels without interrupting the patient care.",
        image: `${assets.Revenue_model}`
    },
    
  ];

  const capabilities = [
    {
        id: 1,
        text: "Seamless registration & secure login system"
    },
    {
        id: 2,
        text: "Role-based access (Admin/User) for controlled experience"
    },
    {
        id: 3,
        text: "Real-time insights powered by Alteryx and Power BI"
    },
    {
        id: 4,
        text: "Unified view of datasets, predictions, graphs, and dashboards"
    },
    {
        id: 5,
        text: "Downloadable results for portability and analysis"
    },

  ]

  return (
    <>
      <div className="bg-image-container">
        <div className="bg-container-initial">
          <div
            className="responsive-container1"
            style={{ position: "relative" }}
          >
            <div>
              <img
                src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1724952055/logo-removebg-preview_prabm4.png"
                className="image-size"
              />
            </div>
            <div className="initial-page-tab-buttons">
              <p>Key Features</p>
              <p>Models Overview</p>
              <p>Capabilities</p>
              <p>Why Choose HANElytics?</p>
              <p>FAQs</p>
            </div>
            <div className="login-register-buttons">
              <div className="button-size">
                <Link
                  to="/register"
                  className="bg-warning rounded-2 p-2 text-white mobile-button"
                  style={{ fontWeight: 600, textDecoration: "none" }}
                >
                  Register
                </Link>
              </div>
              <div>
                <Link
                  to="/login"
                  className="bg-success rounded-2 p-2 text-white mobile-button"
                  style={{ fontWeight: 600, textDecoration: "none" }}
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="initial-page-menu-container">
              {isMenuOpened ? (
                <RxCross1
                  className="mobile-menu"
                  onClick={handleIsMenuOpened}
                />
              ) : (
                <IoMdMenu
                  className="mobile-menu"
                  onClick={handleIsMenuOpened}
                />
              )}
              {isMenuOpened && (
                <div className="initial-page-mobile-menu">
                  <p>Key Features</p>
                  <p>Models Overview</p>
                  <p>Capabilities</p>
                  <p>Why Choose HANElytics?</p>
                  <p>FAQs</p>
                  <Link
                    to="/register"
                    className="bg-warning rounded-2 text-white mobile-button"
                    style={{ fontWeight: 600, textDecoration: "none" }}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="bg-success rounded-2 text-white mobile-button"
                    style={{ fontWeight: 600, textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="hero-section">
            <h1>
              <FaFileAlt className="icon" />
              <AiTwotoneDatabase className="icon" />
              {/* Turn data into decisions with AI-driven insights */}
              HANElytics simplifies predictive insights by turning complex data into clear dashboards, intuitive graphs, and structured tables.
              <FaChartBar className="icon" />
              <FaChartPie className="icon" />
            </h1>
          </div>
          <div className="container key-features-section">
            <h1 className="">Key Features:</h1>
            <div className="key-features-items-container">
              {keyFeatures.map((feature) => (
                <div key={feature.featureId} className="feature-card">
                  <h3>
                    <FaHandPointRight style={{marginRight: "5px"}}/>
                    {feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
            <div></div>
          </div>
          <div className="container key-features-section">
            <h1 className="">Models Overview:</h1>
            <div className="model-features-items-container">
              {modelsOverview.map((model) => (
                <div key={model.modelId} className="model-feature-card">
                  <div>
                      <h3>
                        {model.title}
                        </h3>
                      <p>{model.description}</p>
                  </div>
                  <a download href={model.image}><img src={model.image}/></a>
                </div>
              ))}
            </div>
            <div></div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center header-text-container">
            <h1 className="initial-page-text">
              Artificial Intelligence & Machine Learning Solutions in Supply
              Chain, Injecting Data From Diverse ERP & Non-ERP Sources.
            </h1>
            <div className="text-center ">
              <Link to="/register">
                <button
                  className="bg-warning rounded-2 p-2 text-white m-2"
                  style={{ fontWeight: 700, border: "none" }}
                >
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="bg-success rounded-2 p-2 text-white"
                  style={{ fontWeight: 700, border: "none" }}
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* <div className="bg-image-container">
        <div className="bg-container-initial">
          <div className="responsive-container1">
            <div>
              <img
                src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1724952055/logo-removebg-preview_prabm4.png"
                className="image-size"
              />
            </div>
            
            <div className="login-register-buttons" style={{display: "flex", marginRight: "10px"}}>
              <div className="button-size">
                <Link
                  to="/register"
                  className="bg-warning rounded-2 p-2 text-white mobile-button"
                  style={{ fontWeight: 600, textDecoration: "none" }}
                >
                  Register
                </Link>
              </div>
              <div>
                <Link
                  to="/login"
                  className="bg-success rounded-2 p-2 text-white mobile-button"
                  style={{ fontWeight: 600, textDecoration: "none" }}
                >
                  Login
                </Link>
              </div>
            </div>
            
          </div>
          
          
          <div className="d-flex flex-column justify-content-center align-items-center header-text-container">
            <h1 className="initial-page-text">
              Artificial Intelligence & Machine Learning Solutions in Supply
              Chain, Injecting Data From Diverse ERP & Non-ERP Sources.
            </h1>
            <div className="text-center ">
              <Link to="/register">
                <button
                  className="bg-warning rounded-2 p-2 text-white m-2"
                  style={{ fontWeight: 700, border: "none" }}
                >
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="bg-success rounded-2 p-2 text-white"
                  style={{ fontWeight: 700, border: "none" }}
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      <Footer />
      </div> */}
    </>
  );
}

export default InitialPage;

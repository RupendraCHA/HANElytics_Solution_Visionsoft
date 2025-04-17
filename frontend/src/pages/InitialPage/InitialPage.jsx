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
import { IoIosArrowDown } from "react-icons/io";

function InitialPage() {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [featureUniqueId, setFeatureUniqueId] = useState(0);
  const [answerId, setAnswerId] = useState(0);
  const [activeSection, setActiveSection] = useState("");

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

  const viewAnswerOnClick = (id) => {
    setAnswerId(answerId === id ? null : id)
  }

  const setActiveSectionText = (section) => {

  }

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
      title: "1. Inventory Reorder Point & Safety Stock Prediction - With and Without Live Data",
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
      title: "4. Reorder Point & Safety Stock Predictions for Clinical Drugs/Medicine",
      description:
        "Ensure availability of critical clinical medicines by forecasting demand and recommending adequate buffer stock levels without interrupting the patient care.",
      image: `${assets.Revenue_model}`
    },
    {
      modelId: 5,
      title: "5. Predicting Reams of Paper & Ink (Liters)",
      description:
        "This model forecasts the future consumption of reams of paper and liters of ink using historical usage data and printing trends.",
      image: `${assets.PaperInk_model}`
    },

  ];

  const capabilities = [
    {
      id: 1,
      text: "Multi-Model Integration"
    },
    {
      id: 2,
      text: "User-Centric Design"
    },
    {
      id: 3,
      text: "Data Transparency & Drill-Down"
    },
    {
      id: 4,
      text: "Enterprise Scalability"
    },
    {
      id: 5,
      text: "Role-based access (Admin/User) for controlled experience"
    },
    {
      id: 6,
      text: "No-Code Visualization Integration"
    },
    {
      id: 7,
      text: "Unified view of datasets, predictions, graphs, and dashboards"
    },
    {
      id: 8,
      text: "Downloadable results for portability and analysis"
    },
    {
      id: 9,
      text: "Quick Deployment & Easy Adoption"
    },
    {
      id: 10,
      text: "Many more in progress..."
    },
  ]

  const whyChooseHANElytics = [
    {
      id: 1,
      text: "Smart Predictions, Simplified Interface",
      description: "Built for business and no technical knowledge needed."
    },
    {
      id: 2,
      text: "Unified Data Platform",
      description: "Say goodbye to scattered tools. Hanelytics brings data, intelligence, and action under one roof."
    },
    {
      id: 3,
      text: "Professional, Responsive Design",
      description: "Fast, modern interface that works seamlessly across desktop and mobile devices."
    },
    {
      id: 4,
      text: "Secure & Scalable",
      description: "Built on secure architecture with performance and scalability in mind"
    },
  ]

  const faqs = [
    {
      id: 1,
      question: "What is HANElytics?",
      answer: "HANElytics is a unified analytics platform that leverages AI/ML models and interactive dashboards to help businesses make data-driven decisions. It simplifies forecasting, inventory planning, risk analysis, and demand sensing through an intuitive and user-friendly interface."
    },
    {
      id: 2,
      question: " Who can use HANElytics?",
      answer: "HANElytics is designed for business analysts, supply chain managers, healthcare professionals, and anyone who needs predictive insights without diving deep into technical modeling."
    },
    {
      id: 3,
      question: "Do I need to install Power BI to view dashboards?",
      answer: "No. Hanelytics comes with embedded Power BI dashboards."
    },
    {
      id: 4,
      question: "Can I download the prediction results?",
      answer: "Yes. You can export model insights and data in Excel format with just one click. This feature is useful for reports, meetings, or offline analysis."
    },
    {
      id: 5,
      question: "Is my data secure on HANElytics?",
      answer: "Absolutely. HANElytics is built with secure authentication, role-based access, and encrypted data handling to ensure your information stays protected."
    },
    {
      id: 6,
      question: "Can I try the platform before signing up?",
      answer: "Yes you can request for demo using contact details in the footer section."
      // A live demo mode or preview is under development to allow users to explore basic features before registering."
      // You can also request a demo session via the contact page.
    },
    {
      id: 7,
      question: "What if I forget my login credentials?",
      answer: "The login page includes a password recovery option. Just click Forgot Password and follow the instructions to reset your credentials securely."
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
              {/* <img
                src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1724952055/logo-removebg-preview_prabm4.png"
                className="image-size"
              /> */}
              <Link to="/home" className="initial-page-home-heading">
                <h1 className="header-home-text">HANELYTICS</h1>
              </Link>
            </div>
            <div className="initial-page-tab-buttons">
              <a href="#keyFeatures"  >
                <p className={`${activeSection === "keyFeatures" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("keyFeatures")}>Key Features</p>
              </a>
              <a href="#modelsOverview">
                <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("modelsOverview")}>Models Overview</p>
              </a>
              <a href="#capabilities">
                <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("capabilities")}>Capabilities</p>
              </a>
              <a href="#whyChooseHanelytics">
                <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("whyChooseHanelytics")}>Why Choose HANElytics?</p>
              </a>
              <a href="#faqs">
                <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("faqs")}>FAQs</p>
              </a>
            </div>
            <div className="login-register-buttons">
              <div className="button-size">
                <Link
                  to="/register"
                  className="bg-warning rounded-2 p-2 text-black mobile-button"
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
                  {/* <p>Key Features</p> */}
                  <a href="#keyFeatures"  >
                    <p className={`${activeSection === "keyFeatures" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("keyFeatures")}>Key Features</p>
                  </a>
                  <a href="#modelsOverview">
                    <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("modelsOverview")}>Models Overview</p>
                  </a>
                  <a href="#capabilities">
                    <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("capabilities")}>Capabilities</p>
                  </a>
                  <a href="#whyChooseHanelytics">
                    <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("whyChooseHanelytics")}>Why Choose HANElytics?</p>
                  </a>
                  <a href="#faqs">
                    <p className={`${activeSection === "modelsOverview" ? "text-underline" : "feature-section"}`} onClick={() => setActiveSectionText("faqs")}>FAQs</p>
                  </a>
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
              HANElytics simplifies predictive insights by turning complex data into clear dashboards, intuitive graphs, and structured tables and many more.
              <FaChartBar className="icon" />
              <FaChartPie className="icon" />
            </h1>
          </div>
          <div className="container key-features-section" id="keyFeatures">
            <h1 className="">Key Features:</h1>
            <div className="key-features-items-container">
              {keyFeatures.map((feature) => (
                <div key={feature.featureId} className="feature-card">
                  <h3>
                    <FaHandPointRight style={{ marginRight: "5px" }} />
                    {feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
            <div></div>
          </div>
          <div className="container key-features-section" id="modelsOverview">
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
                  <a download href={model.image}><img src={model.image} /></a>
                </div>
              ))}
            </div>
          </div>
          <div className="container key-features-section" id="capabilities">
            <h1 className="">Platform Capabilities:</h1>
            <div className="key-features-items-container">
              {capabilities.map((item) => (
                <div key={item.id} className="feature-card">
                  <div>
                    <h3 style={{ fontSize: "13px", textAlign: 'left' }}>
                      <FaHandPointRight style={{ marginRight: "5px" }} />
                      {item.text}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container key-features-section" id="whyChooseHanelytics">
            <h1 className="">Why Choose HANElytics?:</h1>
            <div className="key-features-items-container">
              {whyChooseHANElytics.map((item) => (
                <div key={item.id} className="feature-card">
                  <div>
                    <h3>
                      <FaHandPointRight style={{ marginRight: "5px" }} />
                      {item.text}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container key-features-section" style={{ marginBottom: "0px" }} id="faqs">
            <h1 className="">FAQs:</h1>
            <div className="faqs-features-items-container">
              {faqs.map((item) => (
                <div key={item.id} className="feature-card">
                  <div>
                    <div className="question-answer" onClick={() => viewAnswerOnClick(item.id)}>
                      <h3 style={{ fontSize: "14px" }}>
                        <FaHandPointRight style={{ marginRight: "5px" }} />
                        {item.question}
                      </h3>
                      <IoIosArrowDown />
                    </div>
                    {item.id === answerId && <p>{item.answer}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="d-flex flex-column justify-content-center align-items-center header-text-container">
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
          </div> */}
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

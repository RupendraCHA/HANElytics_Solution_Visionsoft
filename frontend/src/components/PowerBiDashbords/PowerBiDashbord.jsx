import React, { useContext, useEffect, useState } from "react";
import "./PowerBiDashbord.css";
import Header from "../Header/Header";
import { models } from "powerbi-client";
import 'powerbi-client/dist/powerbi';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";
import { MdKeyboardArrowUp } from "react-icons/md";
import { LuArrowUpRight } from "react-icons/lu";
import Footer from "../Footer/Footer.jsx";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdOutlineDownload } from "react-icons/md";
import { IoIosArrowDropup } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { BiSolidHide } from "react-icons/bi";



// import {OTCOrderData} from "../../pages/SAPData/OTCOrderHeaderData.js"
const PowerBiDashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState("");
  const [isMsgOpened, setMsgOpened] = useState(false);
  const navigate = useNavigate();
  const {
    username,
    token,
    setToken,
    setUsername,
    url,
    storeUserDashboardData,
    setStoreUserDashboardData,
    loggedUserEmail,
    loggedInUserDetails,
    setLoggedInUserDetails,
  } = useContext(StoreContext);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [selectedReport, setSelectedReport] = useState("Revenue Results");
  const [reportData, setReportData] = useState([]);
  const [downloadDataLoad, setDownloadDataLoad] = useState(0);
  const [userAccessingDashboards, setUserAccessingDashboards] = useState([]);
  const [loggedInUserRole, setLoggedInUserRole] = useState("");
  const [isUserDashLoaded, setIsUserDashLoaded] = useState(true);

  const [activeDashBoardID, setActiveDashboardID] = useState("")
  const [activeDashBoardIDText, setActiveDashboardIDText] = useState("")
  const [activeDashboardName, setActiveDashboardName] = useState("")

  



 const handleExcelDownload = (e) => {
  e.preventDefault();

  toast.info("Download initiated. It should be ready shortly.", {
    position: "top-center",
    style: {
      fontSize: "16px",
      padding: "8px 12px",
      borderRadius: "8px",
      color: "#fff",
      backgroundColor: "#000",
      fontWeight: "600",
    },
  });

  fetch("/downloads/final_transport_predictions_with_new_features.xlsx")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      let saved = false; // Track if saveAs was "successful" (initiated)
      try {
        saveAs(blob, "final_transport_predictions_with_new_features.xlsx", {
          onSaveAsComplete: () => {
            saved = true; // Set the flag
          },
        });
        saved = true; // Assume success if saveAs doesn't have a callback
      } catch (error) {
        console.error("saveAs error", error);
        toast.error("Failed to save the file.");
        return; // IMPORTANT: Exit the outer then block on error
      }

      // Use a setTimeout to check if the file was saved, and show message
        setTimeout(() => {
            if (saved) {
                toast.success("File downloaded.", {
                position: "top-center",
                style: {
                    fontSize: "16px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "600",
                },
                });
            }
        }, 2000); 
    })
    .catch((error) => {
      console.error("Download error:", error);
      toast.error("Failed to download the file.");
    });
};

 const handleExcelDownload1 = (e) => {
  e.preventDefault();

  toast.info("Download initiated. It should be ready shortly.", {
    position: "top-center",
    style: {
      fontSize: "16px",
      padding: "8px 12px",
      borderRadius: "8px",
      color: "#fff",
      backgroundColor: "#000",
      fontWeight: "600",
    },
  });

  fetch("/downloads/all_transshipment_predictions.xlsx")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      let saved = false; // Track if saveAs was "successful" (initiated)
      try {
        saveAs(blob, "all_transshipment_predictions.xlsx", {
          onSaveAsComplete: () => {
            saved = true; // Set the flag
          },
        });
        saved = true; 
      } catch (error) {
        console.error("saveAs error", error);
        toast.error("Failed to save the file.");
        return; 
      }

        setTimeout(() => {
            if (saved) {
                toast.success("File downloaded.", {
                position: "top-center",
                style: {
                    fontSize: "16px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "600",
                },
                });
            }
        }, 2000); 
    })
    .catch((error) => {
      console.error("Download error:", error);
      toast.error("Failed to download the file.");
    });
};




  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message);
  };

  const getUserDashboards = async () => {
    const email = localStorage.getItem("email");
    const userData = {
      email: email,
    };
    const userDashboards = await axios.post(
      url + "/api/dashboard/getUserDashboard",
      userData
    );
    setStoreUserDashboardData(userDashboards.data.userDashboards);
    console.log(userDashboards.data.userDashboards);
  };

  const getUserAccessingDashboards = async () => {
    setIsUserDashLoaded(true);
    const email = localStorage.getItem("email");

    const userData = {
      email: email,
    };
    const userAccessingDashboards = await axios.post(
      url + "/api/dashboard/getUserDashboard",
      userData
    );

    console.log(userAccessingDashboards.data);
    setIsUserDashLoaded(false);
    setUserAccessingDashboards(userAccessingDashboards.data.userDashboards);
    console.log(userAccessingDashboards.data.userDashboards);
  };

  const getLoggedUserInfo = async () => {
    const email = localStorage.getItem("email");
    const data = {
      email: email,
    };
    const response = await axios.post(
      url + "/api/user/getLoggedUserDetails",
      data
    );
    console.log(response.data.userLoggedData);

    if (response.data.success) {
      setLoggedInUserDetails(response.data.userLoggedData);
    } else {
      toast.error(response.data.message);
    }

    // console.log("Logged User Details", response.data)
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setLoggedInUserRole(userRole);

    getUserAccessingDashboards();
    startTheServer();
    getUserDashboards();
    getLoggedUserInfo();
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      navigate("/dashboards");
    } else {
      navigate("/login");
    }
  }, []);

  const HANElyticsDashboards = [
    {
      id: 1,
      headerText: "Revenue, Clinical and Equipment Failure",
      dataText: "revenue",
      url: "https://app.powerbi.com/groups/me/reports/31dc0bfe-4eec-4dbd-b418-c7e969f7d2f4/3610dece708b751eba90?experience=power-bi&clientSideAuth=0",
      image: `${assets.Revenue_pic}`,
      groupID: "0800dc12-04e5-484e-b15e-ba0a27efa5c2",
      reportId: "e0d44e90-be86-4d65-973e-59f1a17f6b26",
    },
    {
      id: 2,
      headerText: "Inventory Reorder Point & Safety Stock predictions",
      dataText: "inventory",
      url: "https://app.powerbi.com/groups/me/reports/629c6dc2-6b0d-4c68-9e54-c2a47600a03b/df6b1d7bb0643125b744?experience=power-bi&clientSideAuth=0",
      image: `${assets.Inventory_pic}`,
      groupID: "0800dc12-04e5-484e-b15e-ba0a27efa5c2",
      reportId: "e6d17e90-cf61-4364-a160-f0f76b014929",
    },

    {
      id: 3,
      headerText: "Predicted Reams of Paper & Ink",
      dataText: "reports",
      url: "https://app.powerbi.com/groups/7235dce4-8159-49bc-ab3f-223406e7937b/reports/cdc28a63-1551-4b0c-8385-1150e1dd46ce/8c4854b8de780c3490e6?experience=power-bi&clientSideAuth=0",
      image: `${assets.Paper_ink_pic}`,
      groupID: "7235dce4-8159-49bc-ab3f-223406e7937b",
      reportId: "cdc28a63-1551-4b0c-8385-1150e1dd46ce",
    },
  ];


  const orderToCash = [
    {
      id: 4,
      headerText: "Sales Order Processing",
      dataText: "order",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
      image: `${assets.sales_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "12256cd6-0191-4734-b9e2-26fb5da6f018",
    },
    {
      id: 5,
      headerText: "Outbound Delivery Processing",
      dataText: "delivery",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
      image: `${assets.Outbound_Delivery_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "a55c32db-32a9-42d9-8a3b-b4acb5d156c3",
    },
    {
      id: 6,
      headerText: "Billing & Invoicing",
      dataText: "billing",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
      image: `${assets.Billing_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "39b627f4-0188-4651-890f-d03aa68c9ab3",
    },
  ];
  const procurement = [
    {
      id: 7,
      headerText: "Supplier Order Overview",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
      image: `${assets.Supplier_Order_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "0c34af53-228f-49e3-a217-c7942da55d86",
    },
    {
      id: 8,
      headerText: "Goods Receipt",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/d88fd1c6-d635-4ead-864c-b4971b81e11b/153be76ec304a615ddb5?experience=power-bi&clientSideAuth=0",
      image: `${assets.Goods_Receipt_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "da752be3-4bdd-46b9-a8b0-167c3afb4611",
    },
    {
      id: 9,
      headerText: "Purchase Requisition",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/092a96f6-27cd-41fd-9d6c-798733cfd586/f3156d802d9e138dabba?experience=power-bi&clientSideAuth=0",
      image: `${assets.Purchase_Requisition_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "03fdc7e7-08f2-461c-a07f-9caffceaf864",
    },
  ];
  const manufacturing = [
    {
      id: 10,
      headerText: "Manufacturing Master Data",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/bad34a0b-01fa-4257-9e3f-9fec93098e18/96656c8ea0626564d181?experience=power-bi",
      image: `${assets.Controlling_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "df3ab764-9488-4e8c-a116-15f45ddf85b4",
    },
    {
      id: 11,
      headerText: "Manufacturing Orders",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/df3ab764-9488-4e8c-a116-15f45ddf85b4/e107815aa0ee97c749a3?experience=power-bi&clientSideAuth=0",
      image: `${assets.Material_management_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "df3ab764-9488-4e8c-a116-15f45ddf85b4",
    },
    {
      id: 12,
      headerText: "Production Planning",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/41761ec2-cb0f-43c0-9219-d31f2acc352b/34ada5fd2d2e43cf537e?experience=power-bi",
      image: `${assets.Production_planning_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "41761ec2-cb0f-43c0-9219-d31f2acc352b",
    },
  ];

  const finance = [
    {
      id: 13,
      headerText: "General Ledger",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/00fc9305-da2e-48e8-b53e-16ec28203cb1/0409b2205d1103030976?experience=power-bi&clientSideAuth=0",
      image: `${assets.General_Ledger_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "c5da2b12-6f92-4bf9-979a-73c2900812a2",
    },
    {
      id: 14,
      headerText: "Account Receivables",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/61332e4f-41f9-45f2-bf2b-28f6508591ae/1f55804984a696482416?experience=power-bi&clientSideAuth=0",
      image: `${assets.Accounts_receivable_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "58746290-3ce7-4092-b86e-619523d16c54",
    },
    {
      id: 15,
      headerText: "Account Paybles",
      dataText: "purchase",
      url: "https://app.powerbi.com/groups/me/reports/0ac0709f-27ee-42f9-93d8-069096fa3d39/7fccc7b61a81e7e7a21c?experience=power-bi&clientSideAuth=0",
      image: `${assets.Accounts_payable_pic}`,
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "0fece05d-b9c9-4ec9-b490-e673d708f360",
    },
  ];
  const csd = [
    {
      id: 16,
      headerText: "Customer Sales Data",
      dataText: "purchase",
      image: `${assets.Customer_Sales_Data}`,
      embedUrl: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/2633c0bf-c0d6-4d46-be9e-1a52f829653e/c43c00d0989431c70739?experience=power-bi&clientSideAuth=0",
      groupID: "84691a96-fa30-4e99-8ebf-da73b935661b",
      reportId: "2633c0bf-c0d6-4d46-be9e-1a52f829653e",
    },
  ];
  const tsc = [
    {
      id: 17,
      headerText: "Transport SupplyChain",
      dataText: "Transport SupplyChain",
      image: `${assets.Transport_SupplyChain}`,
      embedUrl: "https://app.powerbi.com/groups/1e60d1df-dcd0-42d3-91ea-55de4ba61701/reports/b310f403-af86-44de-9217-5ceb10e1705c?experience=power-bi&clientSideAuth=0",
      // groupID: "1e60d1df-dcd0-42d3-91ea-55de4ba61701",
      // reportId: "b310f403-af86-44de-9217-5ceb10e1705c",
      groupID: "7235dce4-8159-49bc-ab3f-223406e7937b",
      reportId: "20a97f0d-4fa2-4696-8c36-e41982a0a0ad",
    },
  ];

  const ts = [
    {
      id: 17,
      headerText: "Transshipment",
      dataText: "Transshipment",
      image: `${assets.Trans_shipment}`,
      embedUrl: "https://app.powerbi.com/groups/1e60d1df-dcd0-42d3-91ea-55de4ba61701/reports/7df8c75f-6cb9-44cb-9f85-00d25c1b8d88?experience=power-bi&clientSideAuth=0",
      // groupID: "1e60d1df-dcd0-42d3-91ea-55de4ba61701",
      // reportId: "7df8c75f-6cb9-44cb-9f85-00d25c1b8d88",
      groupID: "7235dce4-8159-49bc-ab3f-223406e7937b",
      reportId: "5551c84f-c7fc-4e52-8a34-d30dd41f601f",
            
    },
  ];

  const allowedNames = new Set(
    userAccessingDashboards
      .filter((item) => item.isAllowed === "Yes")
      .map((item) => item.dashboardName.trim().toLowerCase())
  );

  // console.log("Allowed Names", allowedNames)

  const allowedHANElyticsDashboards = HANElyticsDashboards.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );
  const allowedOrderToCashDashboards = orderToCash.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );
  const allowedProcurementDashboards = procurement.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );
  const allowedManufacturingDashboards = manufacturing.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );

  // console.log("Allowed From Manufacture", allowedManufacturingDashboards)
  const allowedFinanceDashboards = finance.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );
  const allowedCSDDashboards = csd.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );
  const allowedTSDashboards = ts.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );

  const allowedTSCDashboards = tsc.filter((item) =>
    allowedNames.has(item.headerText.trim().toLowerCase())
  );

  // console.log(allowedHANElyticsDashboards)

  // url: "https://app.powerbi.com/groups/me/reports/3219fe8c-78e4-479a-bcdf-b5c77866a05d/052aa96850be00c14191?experience=power-bi&clientSideAuth=0",
  //     image: `${assets.Production_planning_pic}`,
  const tabsList = [
    {
      activeText: "",
      imageUrl: `${assets.ViewAll_pic}`,
      altText: "ViewAllImage",
      tabName: "View All",
    },
    {
      activeText: "HANElytics",
      imageUrl: `${assets.AiMl_pic}`,
      altText: "AIMLImage",
      // tabName: "AI/ML Models"
      tabName: "Supply Chain Models",
    },

    {
      activeText: "OrderToCash",
      imageUrl: `${assets.OrderToCash_pic}`,
      altText: "OrderToCashImage",
      tabName: "Order to Cash",
    },
    {
      activeText: "Procurement",
      imageUrl: `${assets.Procurement_pic}`,
      altText: "ProcurementImage",
      tabName: "Procurement",
    },

    {
      activeText: "Finance",
      imageUrl: `${assets.Finance_pic}`,
      altText: "FinanceImageImage",
      tabName: "Finance",
    },
    {
      activeText: "Manufacturing",
      imageUrl: `${assets.Manufacturing_pic}`,
      altText: "ManufacturingImage",
      tabName: "Manufacturing",
    },
    {
      activeText: "CustomerSalesData",
      imageUrl: `${assets.Manufacturing_pic}`,
      altText: "CSDImage",
      tabName: "Customer Sales Data",
    },
    {
      activeText: "TransportSupplyChain",
      imageUrl: `${assets.Transport_SupplyChain}`,
      altText: "TSCImage",
      tabName: "TransportSupplyChain",
    },
    {
      activeText: "Transshipment",
      imageUrl: `${assets.Trans_shipment}`,
      altText: "CSDImage",
      tabName: "Transshipment",

    },
  ];

  const showDashboards = (activeTab) => {
    setActiveDashboardID("")
    setActiveDashboard(activeTab);
    setMsgOpened(false);
    setIsMenuOpened(false);
  };

  const check = (file) => {
    console.log(file);
  };

  const setIconValue = () => {
    if (isIconClicked === false) {
      setIsIconClicked(true);
    } else {
      setIsIconClicked(false);
    }
  };

  const selectDashboard = (report) => {
    setSelectedReport(report);
    // console.log(report)
  };

  const CustomCloseIcon = ({ closeToast }) => (
    <span
      onClick={closeToast}
      style={{
        color: "red",
        cursor: "pointer",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
      }}
    >
      ✖
    </span>
  );

  const getInfoToast = () => {
    return toast.info("Download initiated. It should be ready shortly.", {
      position: "top-center",
      closeButton: CustomCloseIcon,
      style: {
        fontSize: "16px",
        padding: "8px 12px",
        height: "30px",
        borderRadius: "8px",
        color: "#fff",
        backgroundColor: "#000",
        fontWeight: "600",
      },
    });
  };

  const getSuccessToast = () => {
    return toast.success("File Downloaded.", {
      position: "top-center",
      closeButton: CustomCloseIcon,
      style: {
        fontSize: "16px",
        padding: "8px 12px",
        height: "30px",
        borderRadius: "8px",
        color: "#fff",
        backgroundColor: "#000",
        fontWeight: "600",
      },
    });
  };

  const getInfoDashboardLoadToast = (dashName) => {
    return toast.info(`Dashboard is Loading...`, {
      position: "top-center",
      closeButton: CustomCloseIcon,
      style: {
        fontSize: "16px",
        padding: "8px 12px",
        height: "30px",
        borderRadius: "8px",
        color: "#fff",
        backgroundColor: "#000",
        fontWeight: "600",
      },
    });
  };

  const getSuccessDashLoadToast = (toastMsg) => {
    return toast.success(`${toastMsg}`, {
      position: "top-center",
      closeButton: CustomCloseIcon,
      style: {
        fontSize: "16px",
        padding: "8px 12px",
        height: "30px",
        borderRadius: "8px",
        color: "#fff",
        backgroundColor: "#000",
        fontWeight: "600",
      },
    });
  }


  const downloadDataIntoExcel = (Array, fileName, id) => {
    console.log(id);
    if (!Array || Array.length === 0) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(Array);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, `${fileName}.xlsx`);
    setDownloadDataLoad(false);
    getSuccessToast();
  };

  const downloadReportData = async (dashType, dashName, id) => {
    console.log(dashType, dashName);
    if (
      dashName === "Revenue, Clinical and Equipment Failure" &&
      dashType === "Revenue Results"
    ) {
      try {
        setDownloadDataLoad(id);

        getInfoToast();

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/revenue", {
          headers: { token: jwtToken },
        });

        const result = response.data;
        downloadDataIntoExcel(result, "Revenue Demand Sensing Predictions", id);
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (
      dashName === "Revenue, Clinical and Equipment Failure" &&
      dashType === "Clinical Results"
    ) {
      try {
        setDownloadDataLoad(id);
        getInfoToast();

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/clinical", {
          headers: { token: jwtToken },
        });

        const result = response.data;
        downloadDataIntoExcel(
          result,
          "Inventory Predictions with Clinical Data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (
      dashName === "Revenue, Clinical and Equipment Failure" &&
      dashType === "Equipment Results"
    ) {
      try {
        setDownloadDataLoad(id);

        getInfoToast();

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/equipment", {
          headers: { token: jwtToken },
        });

        const result = response.data;
        downloadDataIntoExcel(
          result,
          "Predictions of Equipment Risk Detection & Failure Prevention",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (
      dashName === "Inventory Reorder Point & Safety Stock predictions"
    ) {
      try {
        setDownloadDataLoad(id);
        getInfoToast();

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/inventory", {
          headers: { token: jwtToken },
        });

        const result = response.data;
        downloadDataIntoExcel(
          result,
          "Inventory Reorder Point & Safety Stock predictions",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Predicted Reams of Paper & Ink") {
      try {
        setDownloadDataLoad(id);
        getInfoToast();

        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(url + "/api/model/inventory1", {
          headers: { token: jwtToken },
        });

        const result = response.data;
        console.log(result);
        downloadDataIntoExcel(result, "Predicted Reams of Paper & Ink", id);
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Sales Order Processing") {
      try {
        setDownloadDataLoad(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/vbak");
        console.log("Response", response.data);

        const keyMapping = {
          VBELN: "orderNumber",
          POSNR: "itemNumber",
          MATNR: "materialNumber",
          ARKTX: "description",
          KWMENG: "quantity",
          KBMENG: "confirmedQuantity",
          VDATU_ANA: "deliveryDate",
          NETPR: "netPrice",
          NETWR: "netValue",
          VRKME: "salesUnit",
          WERKS: "plant",
          PSTYV: "itemCategory",
          FKREL: "billingRelevance",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        // console.log("Transformed Array:", transformedArray)

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Sales Order Processing data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Outbound Delivery Processing") {
      try {
        setDownloadDataLoad(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/likp");
        console.log(response.data);

        const keyMapping = {
          VBELN: "Sales Document Number",
          VSTEL: "Shipping Point",
          VKORG: "Sales Organization",
          LFART: "Delivery Type",
          WADAT: "Delivery Date",
          INCO1: "Incoterms (Part 1)",
          INCO2: "Incoterms (Part 2 / Location)",
          KUNAG: "Sold-To Party",
          KUNNR: "Ship-To Party / Customer Number",
          BTGEW: "Gross Weight",
          NTGEW: "Net Weight",
          WAERK: "Currency",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        // console.log("Transformed Array:", transformedArray)

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Outbound Delivery Processing data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Billing & Invoicing") {
      try {
        setDownloadDataLoad(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/vbrk");
        console.log(response);

        const keyMapping = {
          VBELN: "Sales Document Number",
          FKART: "Document Type",
          VBTYP: "Sales Document Category",
          WAERK: "Currency",
          VKORG: "Sales Organization",
          VTWEG: "Distribution Channel",
          KONDA: "Customer Group",
          INCO1: "Incoterms (Part 1)",
          INCO2: "Incoterms (Part 2 / Location)",
          ZTERM: "Payment Terms",
          BUKRS: "Company Code",
          NETWR: "Net Value",
          KUNRG: "Customer Group",
          KUNAG: "Sold-To Party",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Billing & Invoicing data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Supplier Order Overview") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/ekko");
        console.log(response);

        const keyMapping = {
          EBELN: "Purchase Order Number",
          BUKRS: "Company Code",
          BSTYP: "Purchase Document Type",
          BSART: "Document Type",
          LIFNR: "Vendor Number",
          MATNR: "Material Number",
          EKORG: "Purchasing Organization",
          EKGRP: "Purchasing Group",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Supplier Order Overview data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Purchase Requisition") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/eban");
        console.log(response);

        const keyMapping = {
          BANFN: "Purchase Requisition Number",
          BNFPO: "Purchase Requisition Item",
          BSART: "Document Type",
          BSTYP: "Purchase Document Category",
          STATU: "Processing Status",
          ESTKZ: "Creation Indicator",
          EKGRP: "Purchasing Group",
          ERNAM: "Created By",
          ERDAT: "Changed On",
          TXZ01: "Short Text",
          MATNR: "Material Number",
          WERKS: "Plant",
          MATKL: "Material Group",
          MENGE: "Quantity Requested",
          MEINS: "Unit of Measure",
          BUMNG: "Shortage Quantity",
          BADAT: "Requisition Date",
          LPEIN: "Delivery Date Category",
          LFDAT: "Delivery Date",
          FRGDT: "Release Date",
          WEBAZ: "GR Processing Time",
          PREIS: "Valuation Price",
          PEINH: "Price Unit",
          PSTYP: "Item Category",
          WEPOS: "Goods Receipt",
          REPOS: "Invoice Receipt",
          KTPNR: "Principal Agreement Item",
          QUPOS: "Quota Arrangement Item",
          BATOL: "Resubmission",
          BVDRK: "Number of Resubmissions",
          EBELN: "Purchase Order Number",
          EBELP: "Purchase Order Item",
          BEDAT: "Purchase Order Date",
          BSMNG: "Quantity Ordered",
          LIMIT_CONSUMPTION_VALUE: "Consumption Value for Limit Items",
          RSNUM: "Reservation",
          ARSNR: "Settlement Reservation Number",
          ARSPS: "Item of Settlement Reservation",
          PACKNO: "Package Number",
          CUOBJ: "Internal Object Number",
          MNG02: "Committed Quantity",
        };


        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Purchase Requisition data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Goods Receipt") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/matdoc");
        console.log(response);

        const keyMapping = {
          MATNR: "Material Number",
          WERKS: "Plant",
          LGORT: "Storage Location",
          BUKRS: "Company Code",
          SAKL3: "G/L Account",
          ERFME: "Currency Unit",
          MJAHR: "Fiscal Year",
          EBELN: "Purchase Order Number",
          LIFNR: "Vendor Number",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Goods Receipt data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "General Ledger") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/acdoca1");
        console.log(response);

        const keyMapping = {
          RLDNR: "Document Number (RLDNR)",
          RBUKRS: "Company Code",
          GJAHR: "Fiscal Year",
          BELNR: "Accounting Document Number",
          DOCLN: "Document Line Item",
          RACCT: "Account Number",
          DRCRK: "Debit/Credit Indicator",
          BUDAT: "Posting Date",
          BLDAT: "Document Date",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "General Ledger data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Account Paybles") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/acdoca2");
        console.log(response);

        const keyMapping = {
          RLDNR: "Document Number (RLDNR)",
          RBUKRS: "Company Code",
          GJAHR: "Fiscal Year",
          BELNR: "Accounting Document Number",
          DOCLN: "Document Line Item",
          LIFNR: "Vendor Number",
          RACCT: "Account Number",
          DRCRK: "Debit/Credit Indicator",
          HSL: "Local Currency Amount",
          TSL: "Tax Amount",
          KSL: "Tax Code",
          BUDAT: "Posting Date",
          BLDAT: "Document Date",
          MONAT: "Month",
          UMSKZ: "Special G/L Indicator",
          AWTYP: "Document Type",
          AWKEY: "Document Reference Key",
          BUKRS: "Company Code",
          BLART: "Document Type (BLART)",
          CPUDT: "Document Entry Date",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Account Paybles data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Account Receivables") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/acdoca3");
        console.log(response);

        const keyMapping = {
          RLDNR: "Ledger",
          RBUKRS: "Company Code (RBUKRS)",
          GJAHR: "Fiscal Year",
          BELNR: "Accounting Document Number",
          DOCLN: "Document Line Item",
          KUNNR: "Customer Number",
          RACCT: "Account Number",
          DRCRK: "Debit/Credit Indicator",
          HSL: "Amount in Local Currency",
          TSL: "Amount in Transaction Currency",
          KSL: "Amount in Group Currency",
          BUDAT: "Posting Date",
          BLDAT: "Document Date",
          MONAT: "Posting Period (Month)",
          UMSKZ: "Special G/L Indicator",
          AWTYP: "Reference Transaction",
          AWKEY: "Reference Key",
          BUKRS: "Company Code (BUKRS)",
          BLART: "Document Type",
          CPUDT: "Entry Date",
          BUZE: "Line Item Number (BUZE)",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Account Receivables data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Manufacturing Master Data") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/plpo");
        console.log(response);

        const keyMapping = {
          PLNTY: "Task List Type",
          PLNNR: "Task List Group",
          ZAEHL: "Group Counter",
          DATUV: "Valid From Date",
          LOEKZ: "Deletion Indicator",
          PARKZ: "Usage",
          ANDAT: "Created On",
          ANNAM: "Created By",
          STEUS: "Control Key",
          ARBID: "Internal Operation Number",
          OBJTY: "Object Type",
          WERKS: "Plant",
          VINTV: "Inspection Interval",
          MEINH: "Alternative Unit of Measure",
          UMREN: "Denominator for Conversion",
          UMREZ: "Numerator for Conversion",
          BMSCH: "Base Quantity",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Manufacturing Master data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Manufacturing Orders") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/afvc");
        console.log(response);
        const keyMapping = {
          AUFPL: "Routing Number of Operations",
          PLNFL: "Sequence",
          PLNKN: "Node Number",
          PLNAL: "Group Counter (Alternative)",
          PLNTY: "Task List Type",
          VINTV: "Inspection Interval",
          PLNNR: "Task List Group",
          ZAEHL: "Group Counter",
          VORNR: "Operation/Activity Number",
          STEUS: "Control Key",
          ARBID: "Internal Operation Number",
          WERKS: "Plant",
          LTXA1: "Operation Short Text",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Manufacturing Orders data",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    } else if (dashName === "Production Planning") {
      try {
        setDownloadDataLoad(id);
        console.log(id);
        getInfoToast();
        const response = await axios.get(url + "/api/sales/mkal");
        console.log(response);

        const keyMapping = {
          MATNR: "Material Number",
          WERKS: "Plant",
          VERID: "Production Version",
          BDATU: "Valid From Date",
          ADATU: "Changed On Date",
          STLAL: "Alternative BOM",
          STLAN: "BOM Usage",
          PLNTY: "Task List Type",
          PLNNR: "Task List Group",
          ALNAL: "Group Counter (Alternative Task List)",
          LOSGR: "Lot Size",
          TEXT1: "Description",
          BSTMI: "Minimum Lot Size",
          BSTMA: "Maximum Lot Size",
        };

        const transformedArray = response.data.data.map((item, index) => {
          const newItem = { "S.No": index + 1 };
          for (const key in item) {
            newItem[keyMapping[key] || key] = item[key];
          }
          return newItem;
        });

        setDownloadDataLoad(false);
        downloadDataIntoExcel(
          // response.data.data,
          transformedArray,
          "Production Planning",
          id
        );
      } catch (error) {
        console.log("Error while fetching", error);
      }
    }
  };

  const getResultsAndDownloadElement = (dataModelName, id) => {
    if (dataModelName === "Revenue, Clinical and Equipment Failure") {
      return (
        <div className="bi-excel-download">
          <div
            className=""
            onClick={setIconValue}
            style={{ position: "relative" }}
          >
            <IoIosArrowDropup
              title="Select Dashboard"
              className={`select-model ${isIconClicked === true ? "bi-arrow-down" : "bi-arrow-down-1"
                }`}
            />
            {isIconClicked && (
              <div
                style={{ position: "absolute" }}
                className="report-icon-download-drop-down"
              >
                <p onClick={() => selectDashboard("Revenue Results")}>
                  Revenue Data
                </p>
                <p onClick={() => selectDashboard("Clinical Results")}>
                  Clinical Data
                </p>
                <p onClick={() => selectDashboard("Equipment Results")}>
                  Equipment Data
                </p>
              </div>
            )}
          </div>
          {downloadDataLoad === id ? (
            <div className="bi-spinner"></div>
          ) : (
            <button
              onClick={() =>
                downloadReportData(selectedReport, dataModelName, id)
              }
              className="bi-excel-download-btn"
            >
              <MdOutlineDownload className="bi-excel-download-icon" />
              <RiFileExcel2Fill className="bi-excel-icon" />
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className="bi-excel-download">
          {downloadDataLoad === id ? (
            <div className="bi-spinner"></div>
          ) : (
            <button
              onClick={() => downloadReportData("", dataModelName, id)}
              className="bi-excel-download-btn"
            >
              <MdOutlineDownload className="bi-excel-download-icon" />
              <RiFileExcel2Fill className="bi-excel-icon" />
            </button>
          )}
        </div>
      );
    }
  };

  const getNoAccessViewInfo = () => {
    return (
      <div className="no-access-view-text">
        <p>
          <BiSolidHide className="no-access-icon" />
          You currently don’t have permission to view any dashboard from this
          section. Please reach out to your administrator to request access.
        </p>
      </div>
    );
  };



  const getReportSpecificData = async (id, groupID, reportID, dashName) => {
    console.log(dashName)
    setActiveDashboardName(dashName)
    setActiveDashboardID(id)
    getInfoDashboardLoadToast(dashName)


    try {

      const dashIdsData = {
        groupID: groupID,
        reportID: reportID
      }
      const response = await axios.post(url + "/powerbi/embed/getdashboard", dashIdsData);
      // const data = await response.json();
      console.log(response.data)
      const data = response.data

      const embedConfig = {
        type: "report",
        tokenType: models.TokenType.Embed,
        accessToken: data.token.token,
        embedUrl: data.token.embedUrl,
        id: data.reportId,
        settings: {
          panes: {
            filters: { visible: false },
            pageNavigation: { visible: true }
          },
          navContentPaneEnabled: true
        }
      };

      // Use global powerbi object
      // const report = window.powerbi.embed(reportRef.current, embedConfig);

      const containerID = `report-container-${id}`

      const reportContainer = document.getElementById(containerID)

      // const report = window.powerbi.embed(reportContainer,embedConfig);
      const report = window.powerbi.embed(reportContainer, embedConfig);
      // reportRef.current, 

      setActiveDashboardIDText("Report loaded successfully")
      // Loading your dashboard...

      report.on("loaded", () => {
        getSuccessDashLoadToast("Dashboard Loaded Successfully.")
        console.log("Report loaded successfully");
      });

      report.on("error", (event) => {
        console.error("Power BI error:", event.detail);
      });
    } catch (error) {
      console.error("Error embedding Power BI report:", error);
    }
  }

  const getDashboards = (activeDash) => {
    if (activeDash === "HANElytics") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.AiMl_pic}
              alt="AIMLImage"
              className="dashboard-data-model-image"
            />
            Supply Chain Models:
            {loggedInUserRole === "COO" ||
              loggedInUserRole === "CTO" ||
              loggedInUserRole === "CEO" ? (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                {" "}
                ({HANElyticsDashboards.length} / {HANElyticsDashboards.length})
              </span>
            ) : (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                ({allowedHANElyticsDashboards.length} /
                {HANElyticsDashboards.length})
              </span>
            )}
          </h1>
          {/* <div className="roles-spinner"></div> */}

          <div>
            {loggedInUserRole === "COO" ||
              loggedInUserRole === "CTO" ||
              loggedInUserRole === "CEO" ? (
              <div className="dashboard-section">
                {HANElyticsDashboards.map((type) => {
                  return (
                    <div key={type.headerText} className="dashboard-card">
                      <div className="bi-header-text">
                        <h1 className="card-title">{type.headerText}</h1>
                      </div>
                      <div width={"100vw"}>
                        <img
                          style={{ filter: "brightness(95%)" }}
                          src={type.image}
                          alt={type.headerText}
                          width={"100%"}
                        />
                      </div>
                      <button
                        className="bi-dashboard-button"
                        // onClick={() => login(`${type.dataText}, ${type.url}`)}
                        style={{ position: "relative" }}
                      >
                        {/* <a href={type.url} target="_blank">
                          View Dashboard
                        </a> */}
                        <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                          View Dashboard
                        </p>
                        <p
                          style={{
                            position: "absolute",
                            top: "6px",
                            right: "8px",
                          }}
                        >
                          {getResultsAndDownloadElement(
                            `${type.headerText}`,
                            `${type.id}`
                          )}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="dashboard-section">
                {allowedHANElyticsDashboards.length === 0 ? (
                  getNoAccessViewInfo()
                ) : (
                  <>
                    {allowedHANElyticsDashboards.map((type) => {
                      return (
                        <div key={type.headerText} className="dashboard-card">
                          <div className="bi-header-text">
                            <h1 className="card-title">{type.headerText}</h1>
                          </div>
                          <div width={"100vw"}>
                            <img
                              style={{ filter: "brightness(95%)" }}
                              src={type.image}
                              alt={type.headerText}
                              width={"100%"}
                            />
                          </div>
                          <button
                            className="bi-dashboard-button"
                            // onClick={() => login(`${type.dataText}, ${type.url}`)}
                            style={{ position: "relative" }}
                          >
                            {/* <a href={type.url} target="_blank">
                              View Dashboard
                            </a> */}
                            <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                              View Dashboard
                            </p>

                            <p
                              style={{
                                position: "absolute",
                                top: "6px",
                                right: "8px",
                              }}
                            >
                              {getResultsAndDownloadElement(
                                `${type.headerText}`,
                                `${type.id}`
                              )}
                            </p>
                          </button>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else if (activeDash === "CustomerSalesData") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.Customer_Sales_Data}
              alt="CSDImage"
              className="dashboard-data-model-image"
            />
            Customer Sales Data:
            {loggedInUserRole === "COO" ||
              loggedInUserRole === "CTO" ||
              loggedInUserRole === "CEO" ? (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                ({csd.length} / {csd.length})
              </span>
            ) : (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                ({allowedCSDDashboards.length} / {csd.length})
              </span>
            )}
          </h1>

          <div className="dashboard-section">
            {loggedInUserRole === "COO" ||
              loggedInUserRole === "CTO" ||
              loggedInUserRole === "CEO" ? (
              csd.map((type) => (
                <div key={type.headerText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}>
                    <img
                      style={{ filter: "brightness(95%)" }}
                      src={type.image}
                      alt={type.headerText}
                      width={"100%"}
                    />
                  </div>
                  <button
                    className="bi-dashboard-button"
                    style={{ position: "relative" }}
                  >
                    <p
                      onClick={() =>
                        getReportSpecificData(
                          type.id,
                          type.groupID,
                          type.reportId,
                          type.headerText
                        )
                      }
                    >
                      View Dashboard
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "8px",
                      }}
                    >
                      {getResultsAndDownloadElement(type.headerText, type.id)}
                    </p>
                  </button>
                </div>
              ))
            ) : allowedCSDDashboards.length === 0 ? (
              getNoAccessViewInfo()
            ) : (
              allowedCSDDashboards.map((type) => (
                <div key={type.headerText} className="dashboard-card">
                  <div className="bi-header-text">
                    <h1 className="card-title">{type.headerText}</h1>
                  </div>
                  <div width={"100vw"}>
                    <img
                      style={{ filter: "brightness(95%)" }}
                      src={type.image}
                      alt={type.headerText}
                      width={"100%"}
                    />
                  </div>
                  <button
                    className="bi-dashboard-button"
                    style={{ position: "relative" }}
                  >
                    <p
                      onClick={() =>
                        getReportSpecificData(
                          type.id,
                          type.groupID,
                          type.reportId,
                          type.headerText
                        )
                      }
                    >
                      View Dashboard
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "8px",
                      }}
                    >
                      {getResultsAndDownloadElement(type.headerText, type.id)}
                    </p>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }


   else if (activeDash === "TransportSupplyChain") {
  return (
    <div>
      <h1 className="dashboard-title">
        <img
          src={assets.Transport_SupplyChain}
          alt="TSCImage"
          className="dashboard-data-model-image"
        />
        Transport Supply Chain:
        {loggedInUserRole === "COO" ||
        loggedInUserRole === "CTO" ||
        loggedInUserRole === "CEO" ? (
          <span style={{ fontSize: "20px", marginLeft: "5px" }}>
            ({tsc.length} / {tsc.length})
          </span>
        ) : (
          <span style={{ fontSize: "20px", marginLeft: "5px" }}>
            ({allowedTSCDashboards.length} / {tsc.length})
          </span>
        )}
      </h1>

      <div className="dashboard-section">
        {loggedInUserRole === "COO" ||
        loggedInUserRole === "CTO" ||
        loggedInUserRole === "CEO" ? (
          tsc.map((type) => (
            <div key={type.headerText} className="dashboard-card">
              <div className="bi-header-text">
                <h1 className="card-title">{type.headerText}</h1>
              </div>
              <div width={"100vw"}>
                <img
                  style={{ filter: "brightness(95%)" }}
                  src={type.image}
                  alt={type.headerText}
                  width={"100%"}
                />
              </div>
              <button
                className="bi-dashboard-button"
                style={{ position: "relative" }}
              >
                <p
                  onClick={() =>
                    getReportSpecificData(
                      type.id,
                      type.groupID,
                      type.reportId,
                      type.headerText
                    )
                  }
                >
                  View Dashboard
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "8px",
                  }}
                >
                  {getResultsAndDownloadElement(type.headerText, type.id)}
                </p>
              </button>
            </div>
          ))
        ) : allowedTSCDashboards.length === 0 ? (
          getNoAccessViewInfo()
        ) : (
          allowedTSCDashboards.map((type) => (
            <div key={type.headerText} className="dashboard-card">
              <div className="bi-header-text">
                <h1 className="card-title">{type.headerText}</h1>
              </div>
              <div width={"100vw"}>
                <img
                  style={{ filter: "brightness(95%)" }}
                  src={type.image}
                  alt={type.headerText}
                  width={"100%"}
                />
              </div>
              <button
                className="bi-dashboard-button"
                style={{ position: "relative" }}
              >
                <p
                  onClick={() =>
                    getReportSpecificData(
                      type.id,
                      type.groupID,
                      type.reportId,
                      type.headerText
                    )
                  }
                >
                  View Dashboard
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "8px",
                  }}
                >
                  <a
                    href="#"
                    onClick={handleExcelDownload}
                    className="bi-excel-download-btn"
                    title="Download Transport Supply Chain Data"
                  >
                    <span className="bi-excel-download-icon-wrapper">
                      <MdOutlineDownload className="bi-excel-download-icon" />
                      <RiFileExcel2Fill className="bi-excel-icon" />
                    </span>
                  </a>
                </p>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
else if (activeDash === "Manufacturing") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.Manufacturing_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Manufacturing:
            {loggedInUserRole === "COO" ||
            loggedInUserRole === "CTO" ||
            loggedInUserRole === "CEO" ? (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                {" "}
                ({manufacturing.length} / {manufacturing.length})
              </span>
            ) : (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                {" "}
                ({allowedManufacturingDashboards.length} /{" "}
                {manufacturing.length})
              </span>
            )}
          </h1>
          {loggedInUserRole === "COO" ||
          loggedInUserRole === "CTO" ||
          loggedInUserRole === "CEO" ? (
            <div className="dashboard-section">
              {manufacturing.map((type) => {
                return (
                  <div key={type.headerText} className="dashboard-card">
                    <div className="bi-header-text">
                      <h1 className="card-title">{type.headerText}</h1>
                    </div>
                    <div width={"100vw"}>
                      <img
                        style={{ filter: "brightness(95%)" }}
                        src={type.image}
                        alt={type.headerText}
                        width={"100%"}
                      />
                    </div>

                    <button
                      className="bi-dashboard-button"
                      // onClick={() => login(`${type.dataText}, ${type.url}`)}
                      style={{ position: "relative" }}
                    >
                      {/* <a href={type.url} target="_blank">
                        View Dashboard
                      </a> */}
                      <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId,type.headerText)}>
                        View Dashboard
                        </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "8px",
                        }}
                      >
                        {getResultsAndDownloadElement(
                          `${type.headerText}`,
                          `${type.id}`
                        )}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dashboard-section">
              {allowedManufacturingDashboards.length === 0 ? (
                getNoAccessViewInfo()
              ) : (
                <>
                  {allowedManufacturingDashboards.map((type) => {
                    return (
                      <div key={type.headerText} className="dashboard-card">
                        <div className="bi-header-text">
                          <h1 className="card-title">{type.headerText}</h1>
                        </div>
                        <div width={"100vw"}>
                          <img
                            style={{ filter: "brightness(95%)" }}
                            src={type.image}
                            alt={type.headerText}
                            width={"100%"}
                          />
                        </div>

                        <button
                          className="bi-dashboard-button"
                          // onClick={() => login(`${type.dataText}, ${type.url}`)}
                          style={{ position: "relative" }}
                        >
                          {/* <a href={type.url} target="_blank">
                            View Dashboard
                          </a> */}
                          <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId,type.headerText)}>
                        View Dashboard
                        </p>
                          <p
                            style={{
                              position: "absolute",
                              top: "6px",
                              right: "8px",
                            }}
                          >
                            {getResultsAndDownloadElement(
                              `${type.headerText}`,
                              `${type.id}`
                            )}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
      );
    } 
  else if (activeDash === "OrderToCash") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.OrderToCash_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Order to Cash:
            {loggedInUserRole === "COO" ||
              loggedInUserRole === "CTO" ||
              loggedInUserRole === "CEO" ? (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                ({orderToCash.length} / {orderToCash.length})
              </span>
            ) : (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                ({allowedOrderToCashDashboards.length} / {orderToCash.length})
              </span>
            )}
          </h1>
          {loggedInUserRole === "COO" ||
            loggedInUserRole === "CTO" ||
            loggedInUserRole === "CEO" ? (
            <div className="dashboard-section">
              {orderToCash.map((type) => {
                {
                  /* {allowedOrderToCashDashboards.map((type) => { */
                }
                return (
                  <div key={type.headerText} className="dashboard-card">
                    <div className="bi-header-text">
                      <h1 className="card-title">{type.headerText}</h1>
                    </div>
                    <div width={"100vw"}>
                      <img
                        style={{ filter: "brightness(95%)" }}
                        src={type.image}
                        alt={type.headerText}
                        width={"100%"}
                      />
                    </div>

                    <button
                      className="bi-dashboard-button"
                      // onClick={() => login(`${type.dataText}, ${type.url}`)}

                      style={{ position: "relative" }}
                    >
                      {/* <a href={type.url} target="_blank">
                        View Dashboard
                      </a> */}
                      <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                        View Dashboard
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "8px",
                        }}
                      >
                        {getResultsAndDownloadElement(
                          `${type.headerText}`,
                          `${type.id}`
                        )}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dashboard-section">
              {/* {orderToCash.map((type) => { */}
              {allowedOrderToCashDashboards.length === 0 ? (
                getNoAccessViewInfo()
              ) : (
                <>
                  {allowedOrderToCashDashboards.map((type) => {
                    return (
                      <div key={type.headerText} className="dashboard-card">
                        <div className="bi-header-text">
                          <h1 className="card-title">{type.headerText}</h1>
                        </div>
                        <div width={"100vw"}>
                          <img
                            style={{ filter: "brightness(95%)" }}
                            src={type.image}
                            alt={type.headerText}
                            width={"100%"}
                          />
                        </div>

                        <button
                          className="bi-dashboard-button"
                          // onClick={() => login(`${type.dataText}, ${type.url}`)}
                          style={{ position: "relative" }}
                        >
                          {/* <a href={type.url} target="_blank">
                            View Dashboard
                          </a> */}
                          <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                            View Dashboard
                          </p>
                          <p
                            style={{
                              position: "absolute",
                              top: "6px",
                              right: "8px",
                            }}
                          >
                            {getResultsAndDownloadElement(
                              `${type.headerText}`,
                              `${type.id}`
                            )}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
      );
    } else if (activeDash === "Procurement") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.Procurement_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Procurement:
            {loggedInUserRole === "COO" ||
              loggedInUserRole === "CTO" ||
              loggedInUserRole === "CEO" ? (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                ({procurement.length} / {procurement.length})
              </span>
            ) : (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                ({allowedProcurementDashboards.length} / {procurement.length})
              </span>
            )}
          </h1>
          {loggedInUserRole === "COO" ||
            loggedInUserRole === "CTO" ||
            loggedInUserRole === "CEO" ? (
            <div className="dashboard-section">
              {procurement.map((type) => {
                return (
                  <div key={type.headerText} className="dashboard-card">
                    <div className="bi-header-text">
                      <h1 className="card-title">{type.headerText}</h1>
                    </div>
                    <div width={"100vw"}>
                      <img
                        style={{ filter: "brightness(95%)" }}
                        src={type.image}
                        alt={type.headerText}
                        width={"100%"}
                      />
                    </div>
                    <button
                      className="bi-dashboard-button"
                      // onClick={() => login(`${type.dataText}, ${type.url}`)}
                      style={{ position: "relative" }}
                    >
                      {/* <a href={type.url} target="_blank">
                        View Dashboard
                      </a> */}
                      <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                        View Dashboard
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "8px",
                        }}
                      >
                        {getResultsAndDownloadElement(
                          `${type.headerText}`,
                          `${type.id}`
                        )}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dashboard-section">
              {allowedProcurementDashboards.length === 0 ? (
                getNoAccessViewInfo()
              ) : (
                <>
                  {allowedProcurementDashboards.map((type) => {
                    return (
                      <div key={type.headerText} className="dashboard-card">
                        <div className="bi-header-text">
                          <h1 className="card-title">{type.headerText}</h1>
                        </div>
                        <div width={"100vw"}>
                          <img
                            style={{ filter: "brightness(95%)" }}
                            src={type.image}
                            alt={type.headerText}
                            width={"100%"}
                          />
                        </div>
                        <button
                          className="bi-dashboard-button"
                          // onClick={() => login(`${type.dataText}, ${type.url}`)}
                          style={{ position: "relative" }}
                        >
                          {/* <a href={type.url} target="_blank">
                            View Dashboard
                          </a> */}
                          <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                            View Dashboard
                          </p>
                          <p
                            style={{
                              position: "absolute",
                              top: "6px",
                              right: "8px",
                            }}
                          >
                            {getResultsAndDownloadElement(
                              `${type.headerText}`,
                              `${type.id}`
                            )}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
      );
    } else if (activeDash === "Transshipment") {
  return (
    <div>
      <h1 className="dashboard-title">
        <img
          src={assets.Trans_shipment}
          alt="OrderToCashImage"
          className="dashboard-data-model-image"
        />
        Transshipment
        {loggedInUserRole === "COO" ||
        loggedInUserRole === "CTO" ||
        loggedInUserRole === "CEO" ? (
          <span style={{ fontSize: "20px", marginLeft: "5px" }}>
            {" "}
            ({ts.length} / {ts.length})
          </span>
        ) : (
          <span style={{ fontSize: "20px", marginLeft: "5px" }}>
            {" "}
            ({allowedTSDashboards.length} / {ts.length})
          </span>
        )}
      </h1>
      {loggedInUserRole === "COO" ||
      loggedInUserRole === "CTO" ||
      loggedInUserRole === "CEO" ? (
        <div className="dashboard-section">
          {ts.map((type) => {
            return (
              <div key={type.headerText} className="dashboard-card">
                <div className="bi-header-text">
                  <h1 className="card-title">{type.headerText}</h1>
                </div>
                <div width={"100vw"}>
                  <img
                    style={{ filter: "brightness(95%)" }}
                    src={type.image}
                    alt={type.headerText}
                    width={"100%"}
                  />
                </div>

                <button
                  className="bi-dashboard-button"
                  style={{ position: "relative" }}
                >
                  <p
                    onClick={() =>
                      getReportSpecificData(
                        type.id,
                        type.groupID,
                        type.reportId,
                        type.headerText
                      )
                    }
                  >
                    View Dashboard
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "8px",
                    }}
                  >
                    {getResultsAndDownloadElement(type.headerText, type.id)}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="dashboard-section">
          {allowedTSDashboards.length === 0 ? (
            getNoAccessViewInfo()
          ) : (
            <>
              {allowedTSDashboards.map((type) => {
                return (
                  <div key={type.headerText} className="dashboard-card">
                    <div className="bi-header-text">
                      <h1 className="card-title">{type.headerText}</h1>
                    </div>
                    <div width={"100vw"}>
                      <img
                        style={{ filter: "brightness(95%)" }}
                        src={type.image}
                        alt={type.headerText}
                        width={"100%"}
                      />
                    </div>

                    <button
                      className="bi-dashboard-button"
                      style={{ position: "relative" }}
                    >
                      <p
                        onClick={() =>
                          getReportSpecificData(
                            type.id,
                            type.groupID,
                            type.reportId,
                            type.headerText
                          )
                        }
                      >
                        View Dashboard
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "8px",
                        }}
                      >
                        <a
                          href="#"
                          onClick={handleExcelDownload1}
                          className="bi-excel-download-btn"
                          title="Download Transshipment Data"
                        >
                          <span className="bi-excel-download-icon-wrapper">
                            <MdOutlineDownload className="bi-excel-download-icon" />
                            <RiFileExcel2Fill className="bi-excel-icon" />
                          </span>
                        </a>
                      </p>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}else if (activeDash === "Finance") {
      return (
        <div>
          <h1 className="dashboard-title">
            <img
              src={assets.Finance_pic}
              alt="OrderToCashImage"
              className="dashboard-data-model-image"
            />
            Finance:
            {loggedInUserRole === "COO" ||
              loggedInUserRole === "CTO" ||
              loggedInUserRole === "CEO" ? (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                {" "}
                ({finance.length} / {finance.length})
              </span>
            ) : (
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                {" "}
                ({allowedFinanceDashboards.length} / {finance.length})
              </span>
            )}
          </h1>

          {loggedInUserRole === "COO" ||
            loggedInUserRole === "CTO" ||
            loggedInUserRole === "CEO" ? (
            <div className="dashboard-section">
              {finance.map((type) => {
                return (
                  <div key={type.headerText} className="dashboard-card">
                    <div className="bi-header-text">
                      <h1 className="card-title">{type.headerText}</h1>
                    </div>
                    <div width={"100vw"}>
                      <img
                        style={{ filter: "brightness(95%)" }}
                        src={type.image}
                        alt={type.headerText}
                        width={"100%"}
                      />
                    </div>

                    <button
                      className="bi-dashboard-button"
                      // onClick={() => login(`${type.dataText}, ${type.url}`)}
                      style={{ position: "relative" }}
                    >
                      {/* <a href={type.url} target="_blank">
                        View Dashboard
                      </a> */}
                      <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                        View Dashboard
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "8px",
                        }}
                      >
                        {getResultsAndDownloadElement(
                          `${type.headerText}`,
                          `${type.id}`
                        )}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dashboard-section">
              {allowedFinanceDashboards.length === 0 ? (
                getNoAccessViewInfo()
              ) : (
                <>
                  {allowedFinanceDashboards.map((type) => {
                    return (
                      <div key={type.headerText} className="dashboard-card">
                        <div className="bi-header-text">
                          <h1 className="card-title">{type.headerText}</h1>
                        </div>
                        <div width={"100vw"}>
                          <img
                            style={{ filter: "brightness(95%)" }}
                            src={type.image}
                            alt={type.headerText}
                            width={"100%"}
                          />
                        </div>

                        <button
                          className="bi-dashboard-button"
                          // onClick={() => login(`${type.dataText}, ${type.url}`)}
                          style={{ position: "relative" }}
                        >
                          {/* <a href={type.url} target="_blank">
                            View Dashboard
                          </a> */}
                          <p onClick={() => getReportSpecificData(type.id, type.groupID, type.reportId, type.headerText)}>
                            View Dashboard
                          </p>
                          <p
                            style={{
                              position: "absolute",
                              top: "6px",
                              right: "8px",
                            }}
                          >
                            {getResultsAndDownloadElement(
                              `${type.headerText}`,
                              `${type.id}`
                            )}
                          </p>
                        </button>
                      </div>
                    );
                  },)}
                </>
              )}
            </div>
          )}
        </div>
      );
    }
  };

  const handleModelLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("tokenExpiry");
    navigate("/");
  };

  const openMsg = () => {
    if (isMsgOpened === false) {
      setMsgOpened(true);
    } else {
      setMsgOpened(false);
    }
  };
  const handleIsMenuOpened = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  return (
    <div className="power-bi-dashboards">
      <div className="bi-home-container">
        <Link to="/home" className="bi-home-heading">
          <h1>HANELYTICS</h1>
        </Link>
        <div className="dashboard-tabs">
          {tabsList.map((eachTab, index) => (
            <h1
              key={index}
              onClick={() => showDashboards(`${eachTab.activeText}`)}
              className={`powerbi-dashboard-tab-item ${activeDashboard === `${eachTab.activeText}`
                ? "active-dashboard-btn"
                : ""
                }`}
            >
              <img
                src={eachTab.imageUrl}
                alt={`${eachTab.altText}`}
                className="dashboard-data-model-image-tab"
              />
              {eachTab.tabName}
              <MdKeyboardArrowUp
                className={`bi-arrow ${activeDashboard === `${eachTab.activeText}`
                  ? "bi-arrow-down"
                  : ""
                  }`}
              />
            </h1>
          ))}
          <h1
            className="insights-btn"
            onClick={() => navigate("/dataModeling")}
          // onClick={() => navigate("/assignRoles")}
          >
            Data Modeling
            <LuArrowUpRight className="insights-icon" />
          </h1>
        </div>
        <div className="bi-drop-down">
          <div className="bi-icon-username" style={{ position: "relative" }}>
            <FaRegUserCircle className="bi-user-icon" />
            <p className="bi-username-text">{username}</p>
            {loggedInUserDetails.map((user, index) => (
              <div
                key={index}
                style={{ position: "absolute" }}
                className="bi-logged-person-details"
              >
                <h3 className="logged-user-name">
                  Hi, {user.firstname} {user.lastname}
                </h3>
                <hr style={{ margin: "5px 0px" }} />
                <div className="user-info-section">
                  <div className="details-section">
                    <label id="email">Email:</label>
                    <input type="text" value={user.email} />
                  </div>
                  <div className="details-section">
                    <label id="email">Contact:</label>
                    <input
                      type="text"
                      value={`${user.countryPhoneCode} ${user.contact}`}
                    />
                  </div>
                </div>

                <h3 className="logged-user-name" style={{ marginTop: "25px" }}>
                  Business Info
                </h3>
                <hr style={{ margin: "5px 0px" }} />

                <div className="user-business-section">
                  <div className="details-section">
                    <label id="email">Name:</label>
                    <input type="text" value={user.businessName} />
                  </div>
                  <div className="details-section">
                    <label id="email">Role:</label>
                    <input type="text" value={user.role} />
                  </div>
                  <div className="details-section">
                    <label id="email">Country:</label>
                    <input type="text" value={user.country} />
                  </div>
                  <div className="details-section">
                    <label id="email">State:</label>
                    <input type="text" value={user.state} />
                  </div>

                  <div className="details-section">
                    <label id="email">City:</label>
                    <input type="text" value={user.city} />
                  </div>
                  <div className="details-section">
                    <label id="email">Zipcode:</label>
                    <input type="text" value={user.zipcode} />
                  </div>
                  <div className="details-section">
                    <label id="email">Street:</label>
                    <input type="text" value={user.street} />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <button onClick={handleModelLogout}>Logout</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={handleModelLogout}>Logout</button>
          </div>
        </div>
      </div>
      <div
        className="bi-mobile-header-container"
        style={{ position: "relative" }}
      >
        <Link to="/home" className="bi-datamodels-website-heading">
          <h1>HANELYTICS</h1>
        </Link>
        <div className="bi-mobile-menu-container">
          {isMenuOpened ? (
            <RxCross1 className="bi-mobile-menu" onClick={handleIsMenuOpened} />
          ) : (
            <IoMdMenu className="bi-mobile-menu" onClick={handleIsMenuOpened} />
          )}
          {isMenuOpened && (
            <div className="mobile-menu-bi-home-container">
              <div className="mobile-dashboard-tabs">
                {tabsList.map((eachTab, index) => (
                  <h1
                    key={index}
                    onClick={() => showDashboards(`${eachTab.activeText}`)}
                    className={`powerbi-dashboard-tab-item ${activeDashboard === `${eachTab.activeText}`
                      ? "active-dashboard-btn"
                      : ""
                      }`}
                  >
                    <img
                      src={eachTab.imageUrl}
                      alt={`${eachTab.altText}`}
                      className="dashboard-data-model-image-tab"
                    />
                    {eachTab.tabName}
                    <MdKeyboardArrowUp
                      className={`bi-arrow ${activeDashboard === `${eachTab.activeText}`
                        ? "bi-arrow-down"
                        : ""
                        }`}
                    />
                  </h1>
                ))}
                <h1
                  className="insights-btn"
                  onClick={() => navigate("/dataModeling")}
                >
                  Data Modeling
                  <LuArrowUpRight className="insights-icon" />
                </h1>
              </div>
              <div className="bi-drop-down">
                {/* <div className="bi-icon-username">
                <FaRegUserCircle className="bi-user-icon" />
                <p className="bi-username-text">{username}</p>
              </div> */}
                <div>
                  <h2
                    style={{ padding: "8px 12px" }}
                    id="mobile-login-btn"
                    onClick={handleModelLogout}
                  >
                    Logout
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeDashBoardID === "" && activeDashBoardIDText === "" && <div className="bi-reporting-dashboards">
        <div className="container bi-reporting-dashboards-sections">
          <div>
            {isUserDashLoaded ? (
              <div className="bi-roles-spinner"></div>
            ) : (
              <div>
                {activeDashboard === "" && (
                  <>
                    {getDashboards("HANElytics")}
                    {getDashboards("OrderToCash")}
                    {getDashboards("Procurement")}
                    {getDashboards("Finance")}
                    {getDashboards("Manufacturing")}
                    {getDashboards("CustomerSalesData")}
                    {getDashboards("TransportSupplyChain")}
                    {getDashboards("Transshipment")}

                  </>
                )}
              </div>
            )}
            {activeDashboard === "HANElytics" && (
              <>{getDashboards("HANElytics")}</>
            )}
            {activeDashboard === "OrderToCash" && (
              <>{getDashboards("OrderToCash")}</>
            )}
            {activeDashboard === "Procurement" && (
              <>{getDashboards("Procurement")}</>
            )}
            {activeDashboard === "Finance" && <>{getDashboards("Finance")}</>}

            {activeDashboard === "Manufacturing" && (
              <>{getDashboards("Manufacturing")}</>
            )}
            {activeDashboard === "CustomerSalesData" && (
              <>{getDashboards("CustomerSalesData")}</>
            )}
            {activeDashboard === "TransportSupplyChain" && (
              <>{getDashboards("TransportSupplyChain")}</>
            )}
            {activeDashboard === "Transshipment" && (
              <>{getDashboards("Transshipment")}</>
            )}
          </div>
        </div>
      </div>}
      {activeDashBoardID === "" ? "" :
        <div className="container bi-embedding-container" >

          <div className="bi-dash-name-container"
          >
            <h1 className="bi-embed-heading">{activeDashboardName}</h1>
            <button
              onClick={() => {
                setActiveDashboardID("")
                setActiveDashboardIDText("")
              }}>Go Back</button>
          </div>
          <div
            id={`report-container-${activeDashBoardID}`}
            className="bi-report-embedding"
          >

          </div>
        </div>}
      <Footer />
    </div>
  );
};

export default PowerBiDashboard;

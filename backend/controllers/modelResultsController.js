import { MongoClient } from "mongodb";
import AutomationData from "../models/odataModel.js";
import axios from "axios";

export const transferDataToSAP = async (req, res) => {
  // const {objectData} = req.body
  const { odataPayload } = req.body;
  console.log("Procurement To Vendor", odataPayload)
  console.log("_------------")

//   const odataPayload = {
//     "Process" : "Create",
//     "Automation_to_Hanlytic_np" : [
//    {
//     "Material" : "000000000000000151",
//     "Supplier" : " 0000200070",
//     "Distribution_Center" : "DC05",
//    "Quantity" : "100.00"
//     }
//  ]
// }

  try {
    const SAP_API_URL =
      "http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_SRV/AutomationSet";
    const username1 = "Hanelytics";
    const password1 = "Hanelytics@24"; // 2022 system
  //   const SAP_API_URL =
  //     "http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_THRT_SRV/AutomationSet";
  //   const username1 = "vamshib";
  //   const password1 = "Anjaneya@209"; // 2022 system

    

    // const SAP_API_URL =
    //   "http://52.41.105.117:8000/sap/opu/odata/VSHANEYA/INTER_COMPANY_TRNS_SRV/AutomationSet";
    // const username1 = "HANELYTICS";
    // const password1 = "Welcome@12345"; // ECC System

    const headers = {
      "Content-Type": "application/json", // Payload format

      "X-Requested-With": "X",
      Authorization:
        "Basic " + Buffer.from(`${username1}:${password1}`).toString("base64"), // Basic Auth
    };

    const response1 = await axios.post(SAP_API_URL, odataPayload, { headers });
    console.log(
      `Data pushed successfully into the SAP System from HANElytics System`,
      response1.data
    );
    return res.status(201).json({
      message: "✔✔✔ Data Transferred Successfully to the SAP System. ✔✔✔",
      success: true,
    });
  } catch (error) {
    // console.error(`Failed to push data into SAP`, error.message);
    // console.error(error)
    console.log("---------------");
    // console.log(odataPayload.slice(0, 3))
    console.error(
      "Error pushing data to SAP:", error
    );
    // ? error.response.data : error.message
    // return res.status(400).json({ message: 'Error pushing data to SAP:' });
  }
};

export const transferDataToSAP1 = async (req, res) => {
  // const {objectData} = req.body
  const { odataPayload1 } = req.body;
  console.log("Inter Company Sales", odataPayload1)

//   const odataPayload = {
//     "Process" : "Create",
//     "Automation_to_Hanlytic_np" : [
//    {
//     "Material" : "000000000000000151",
//     "Supplier" : " 0000200070",
//     "Distribution_Center" : "DC05",
//    "Quantity" : "100.00"
//     }
//  ]
// }

  try {
    // const SAP_API_URL =
    //   "http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_SRV/AutomationSet";
    // const username1 = "Rupendra";
    // const password1 = "R###vsoft1234"; // 2022 system
    const SAP_API_URL =
      "http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_THRT_SRV/AutomationSet";
    // const username1 = "vamshib";
    // const password1 = "Anjaneya@209";
    //  // 2022 system
    // const username1 = "Hanelytics";
    // const password1 = "Hanelytics@24";
    const username1 = "HANEYA_RPA";
    const password1 = "Haneya@1234";
  //   async function getCsrfToken() {
  //     const response = await axios.get('http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_THRT_SRV/AutomationSet', {
  //         headers: {
  //           'Authorization':
  //           "Basic " + Buffer.from(`${username1}:${password1}`).toString("base64"),
  //             'X-CSRF-Token': 'Fetch'
  //         }
  //     });
  
  //     return response.headers['x-csrf-token'];
  // }
  // const csrfToken = await getCsrfToken();
// await axios.post(
//     'http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_THRT_SRV/AutomationSet',
//     data,
//     {
//         headers: {
//             'Authorization': `Basic ${encodedCredentials}`,
//             'X-CSRF-Token': csrfToken,
//             'Content-Type': 'application/json'
//         }
//     }
// );
    

    // const SAP_API_URL =
    //   "http://52.41.105.117:8000/sap/opu/odata/VSHANEYA/INTER_COMPANY_TRNS_SRV/AutomationSet";
    // const username1 = "HANELYTICS";
    // const password1 = "Welcome@12345"; // ECC System

    const headers = {
      "Content-Type": "application/json", // Payload format
      "X-Requested-With": "X",
      // Replace with actual CSRF token if required
      Authorization:
        "Basic " + Buffer.from(`${username1}:${password1}`).toString("base64"), // Basic Auth
    };

    const response1 = await axios.post(SAP_API_URL, odataPayload1, { headers });
    console.log(
      `Data pushed successfully into the SAP System from HANElytics System`,
      response1.data
    );
    if (response1){
      return res.status(201).json({
        message: "✓✓ Data Transferred Successfully",
        success: true,
        data: odataPayload1
      });
    }else {
      return res.status(500).json({
        message: "Check SAP Odata port started or not...",
        success: false,
      }); 
    }
    
  } catch (error) {
    
    
    console.log("---------------");
    // console.log(odataPayload.slice(0, 3))
    console.error(
      "Error pushing data to SAP:", error
    );
    console.log("Check Your SAP OData Service started or not...")
    return res.status(500).json({
      message: "Check SAP Odata port started or not...",
      success: false,
    });
  }
};


export const getOdata = async (req, res) => {
  try {
    const mongoURI = process.env.MONGO_URI;

    const client = new MongoClient(mongoURI);
    await client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("automationdatas");

    const allDocuments = await collection.find().toArray();
    // console.log(allDocuments)
    return res.json(allDocuments);
  } catch (error) {
    console.log(error);
  }
};

export const InventoryModelResults = async (req, res) => {
  try {
    const mongoURI = process.env.MONGO_URI;

    const client = new MongoClient(mongoURI);
    await client.connect();

    const database = client.db("Inventory_Predictions_Database");
    const collection = database.collection("Predicted_Results");

    const allDocuments = await collection.find().toArray();
    // console.log(allDocuments)
    return res.json(allDocuments);
  } catch (error) {
    console.log(error);
  }
};

export const InventoryModelResults1 = async (req, res) => {
  try {
    const mongoURI = process.env.MONGO_URI;

    const client = new MongoClient(mongoURI);
    await client.connect();

    const database = client.db("Inventory_Predictions_Database_Unique");
    const collection = database.collection("Predicted_Results_Unique");

    const database1 = client.db("News_Paper_Quantity_Predictions");
    const collection1 = database1.collection("Predicted_Results");

    const allDocuments1 = await collection1.find().toArray()
    console.log(allDocuments1)

    const allDocuments = await collection.find().toArray();

    // console.log(allDocuments)
    return res.json(allDocuments1);
  } catch (error) {
    console.log(error);
  }
};

export const RevenueModelResults = async (req, res) => {
  try {
    const mongoURI = process.env.MONGO_URI;

    const client = new MongoClient(mongoURI);
    await client.connect();

    const database = client.db("revenue_dataset");
    const collection = database.collection("revenue_results");

    const allDocuments = await collection.find().toArray();
    return res.json(allDocuments);
  } catch (error) {
    console.log(error);
  }
};

export const EquipmentModelResults = async (req, res) => {
  try {
    const mongoURI = process.env.MONGO_URI;

    const client = new MongoClient(mongoURI);
    await client.connect();

    const database = client.db("Equipment_Data_With_Random_Regressor");
    const collection = database.collection("predicted_cycles");

    const allDocuments = await collection.find().toArray();
    return res.json(allDocuments);
  } catch (error) {
    console.log(error);
  }
};

export const ClinicalModelresults = async (req, res) => {
  try {
    const mongoURI = process.env.MONGO_URI;

    const client = new MongoClient(mongoURI);
    await client.connect();

    const database = client.db("database_of_clinical_details");
    const collection = database.collection("predicted_clinical_data");

    const allDocuments = await collection.find().toArray();
    return res.json(allDocuments);
  } catch (error) {
    console.log(error);
  }
};

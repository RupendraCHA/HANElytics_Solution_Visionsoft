
import {MongoClient} from "mongodb"
import AutomationData from "../models/odataModel.js";
import axios from "axios"

export const transferDataToSAP = async (req, res) => {

        // const {objectData} = req.body
        const {odataPayload} = req.body
  
        try {
            const SAP_API_URL = 'http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/HANELYTICS_SRV/AutomationSet'
            const username1 = "Hanelytics"
            const password1 = "Hanelytics@24"

            const headers = {
                'Content-Type': 'application/json', // Payload format
                // "Content-Type": "application/xml",
                // 'X-CSRF-Token': 'Fetch',
                'X-Requested-With': 'X',
                // Replace with actual CSRF token if required
                'Authorization': 'Basic ' + Buffer.from(`${username1}:${password1}`).toString('base64') // Basic Auth
            };
        
            // const odataPayload1 =  JSON.stringify(odataPayload)
            // const response1 = await axios.post(SAP_API_URL, objectData, { headers });
            const response1 = await axios.post(SAP_API_URL, odataPayload, { headers });
            console.log(`Data pushed successfully into the SAP System from HANElytics System`, response1.data);
            return res.status(201).json({message: "✔✔✔ Data Transferred Successfully to the SAP System. ✔✔✔", success: true})
            // const csrfResponse = await axios.get(SAP_API_URL, {
            //     auth: {
            //       username: username1,
            //       password: password1,
            //     },
            //     headers: {
            //       'X-CSRF-Token': 'Fetch',
            //       'Content-Type': 'application/json',
            //     },
            //   });
          
            //   const csrfToken = csrfResponse.headers['x-csrf-token'];
            //   const cookies = csrfResponse.headers['set-cookie'];
          
            //   console.log('CSRF Token:', csrfToken);

            // const response1 = await axios.post(SAP_API_URL, objectDataForSAP, {
            //     auth: {
            //         username: username1,
            //         password: password1
            //     },
            //     headers: {
            //         // 'X-CSRF-Token': csrfToken,
            //         'X-Requested-With': 'X',
            //         // "Content-Type": "application/atom+xml; charset=utf-8",
            //         // 'X-Requested-With': 'XMLHttpRequest',
            //         // Cookie: cookies.join(';'),
            //         "Content-Type": "application/json",
            //         // "Content-Type": "application/xml",
            //         // "Content-Type": "application/atom+xml",
            //     }
            // })
            
        } catch (error) {
            // console.error(`Failed to push data into SAP`, error.message);
            // console.error(error)
            console.log("---------------")
            console.log(odataPayload)
            console.error('Error pushing data to SAP:', error.response ? error.response.data : error.message);
            // return res.status(400).json({ message: 'Error pushing data to SAP:' });
        }
}

export const AutomationToSAP = async (req, res) => {

    const {Process, Automation_to_Hanlytic_np} = req.body

    // console.log(objectDataForSAP)
    try {

        
        const mongoURI = process.env.MONGO_URI

        const client = new MongoClient(mongoURI)
        await client.connect()

        const database = client.db("HANElytics_Clients")
        const collection = database.collection("automationdatas")

        const deleteResult = await collection.deleteMany({});
        console.log(`${deleteResult.deletedCount} records deleted.`);

        if (Array.isArray(Automation_to_Hanlytic_np)) {
            const newData = new AutomationData({ Process, Automation_to_Hanlytic_np });
            const savedData = await newData.save();
            console.log("Data Stored successfully!")
            return res.status(201).json({ message: 'Data saved successfully!', data: savedData });
        }else {
            return res.status(400).json({ message: 'Invalid data format for Automation_to_Hanlytic_np' });
        }
        
    } catch (error) {
        return res.status(400).json({ message: 'Error saving data', error });
    }  
}

export const getOdata = async (req, res) => {
    try {
        const mongoURI = process.env.MONGO_URI

        const client = new MongoClient(mongoURI)
        await client.connect()

        const database = client.db("HANElytics_Clients")
        const collection = database.collection("automationdatas")

        const allDocuments = await collection.find().toArray()
        // console.log(allDocuments)
        return res.json(allDocuments)
    } catch (error) {
        console.log(error)
    }
}

export const InventoryModelResults = async (req, res) => {    
    try {
        const mongoURI = process.env.MONGO_URI

        const client = new MongoClient(mongoURI)
        await client.connect()

        const database = client.db("Inventory_Predictions_Database")
        const collection = database.collection("Predicted_Results")

        const allDocuments = await collection.find().toArray()
        // console.log(allDocuments)
        return res.json(allDocuments)
    } catch (error) {
        console.log(error)
    }

}

export const RevenueModelResults = async (req, res) => {
    try {
        const mongoURI = process.env.MONGO_URI

        const client = new MongoClient(mongoURI)
        await client.connect()

        const database = client.db("revenue_dataset")
        const collection = database.collection("revenue_results")

        const allDocuments = await collection.find().toArray()
        return res.json(allDocuments)

    } catch (error) {
        console.log(error)
    }
}

export const EquipmentModelResults = async (req, res) => {
    try {
        const mongoURI = process.env.MONGO_URI

        const client = new MongoClient(mongoURI)
        await client.connect()

        const database = client.db("Equipment_Data_With_Random_Regressor")
        const collection = database.collection("predicted_cycles")

        const allDocuments = await collection.find().toArray()
        return res.json(allDocuments)

    } catch (error) {
        console.log(error)
    }
}

export const ClinicalModelresults = async (req, res) => {
    try {
        const mongoURI = process.env.MONGO_URI

        const client = new MongoClient(mongoURI)
        await client.connect()

        const database = client.db("database_of_clinical_details")
        const collection = database.collection("predicted_clinical_data")

        const allDocuments = await collection.find().toArray()
        return res.json(allDocuments)

    } catch (error) {
        console.log(error)
    }
}
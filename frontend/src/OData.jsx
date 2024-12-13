
// Steps to Push MongoDB Data to SAP Using REST API

const axios = require('axios');

// npm install mongoose axios


// MongoDB Connection and Schema
const mongoose = require('mongoose');

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/yourDatabase";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const resultSchema = new mongoose.Schema({
    orderId: String,
    customerName: String,
    orderDate: Date,
    totalAmount: Number
});

const Result = mongoose.model("Result", resultSchema);

// Fetch Data from MongoDB
const fetchResults = async () => {
    try {
        return await Result.find(); // Fetch all records
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return [];
    }
};

// Send Data to SAP Using REST API

// SAP REST API credentials and endpoint
const SAP_API_URL = "https://<sap-server>/sap/opu/odata/sap/SALES_ORDER_API/Orders";
const SAP_USERNAME = "yourUsername";
const SAP_PASSWORD = "yourPassword";

const pushToSAP = async (data) => {

    const a = [];

    for (const record of data) {
        const b = {
            Process : "Create",
            Automation_to_Hanlytic_np : [
           {
            Product_ID : "PUID1002",
            Product_name : "Ultrsonic Machine1",
            Distribution_Center : "DC01",
           Quantity : "100.00"
            }
         ]
    }
   

        try {
            const response = await axios.post(SAP_API_URL, payload, {
                auth: {
                    username: SAP_USERNAME,
                    password: SAP_PASSWORD
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(`Data pushed successfully for OrderID: ${record.orderId}`, response.data);
        } catch (error) {
            console.error(`Failed to push data for OrderID: ${record.orderId}`, error.response?.data || error.message);
        }
    }
};


const main = async () => {
    const data = await fetchResults();

    if (data.length === 0) {
        console.log("No data to push to SAP.");
        return;
    }

    console.log("Pushing data to SAP...");
    await pushToSAP(data);
    console.log("Data push completed.");
};

main();

// Finished


// Connection to MongoDB and Defining the Schema

const mongoose = require('mongoose')


// MongoDB Connection

const connectToMongoDB = async () => {
    const mongoURI1 = "mongodb+srv://rupendrachandaluri:<db_password>@cluster0.iqrea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(mongoURI)
}

connectToMongoDB()

// Defining the Schema

const fieldsSchema = new mongoose.schema({
    productID: String,
    productName: String,
    distributionCenter: String,
    reorderPoint: Number
})

const SAPFields = mongoose.model("SAPFileds", HanelyticsToSap)





// Fetching Data from MongoDB

const fetchResults1 = async () => {
    try {
        return await Result.find({})
    } catch (error) {
        console.log("Error fetching the data from MongoDB", error)
        return []
    }
}


// Pushing HANElytics System Data for SAP system Using OData Services

const main1 = async () => {
    const data = await fetchResults();
    
}

main1()

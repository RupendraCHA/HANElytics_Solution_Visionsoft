
import {MongoClient} from "mongodb"
import AutomationData from "../models/odataModel.js";

export const AutomationToSAP = async (req, res) => {
    try {
        const {Process, Automation_to_Hanlytic_np} = req.body

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
            res.status(201).json({ message: 'Data saved successfully!', data: savedData });
        }else {
            res.status(400).json({ message: 'Invalid data format for Automation_to_Hanlytic_np' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error saving data', error });
    }
}

export const getOdata = async (req, res) => {
    try {
        const mongoURI = process.env.MONGO_URI

        const client = new MongoClient(mongoURI)
        await client.connect()

        const database = client.db("HANElytics_Clients")
        const collection = database.collection("automationdatas")

        const allDocuments = await collection.find({}).limit(140).toArray();
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

import {MongoClient} from "mongodb"

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
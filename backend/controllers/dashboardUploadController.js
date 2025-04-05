import DashboardAccess from "../models/dashboardsSchema.js";

export const uploadDashboard = async (req, res) => {
    const {dashboardName, uploadedBy} = req.body

    try {
        if (dashboardName !== ""){
            const newDashboard = new DashboardAccess({
                dashboardName: dashboardName,
                uploadedBy: uploadedBy
            })

            const dashboard = await newDashboard.save()
            console.log("Uploaded")
            res.status(200).json({success: true, message: "Dashboard uploaded.", dashboard: dashboard})
        }
    } catch (error) {
        res.status(404).json({success: false, message: "Failed to upload dashboard"})
        console.log("Error occurred", error)
    }
}

export const getAllDashboards = async (req, res) => {
    try {
        const allDashboards = await DashboardAccess.find()
        res.status(200).json({allDashboards: allDashboards})
    } catch (error) {
        res.status(401).json({message: "Unable to find the Data"})
        console.log("Error while fetching", error)
    }
}
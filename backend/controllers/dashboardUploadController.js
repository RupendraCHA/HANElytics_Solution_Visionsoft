import DashboardAccess from "../models/dashboardsSchema.js";
import MixedEntry from "../models/UserPermissionModel.js";


export const uploadDashboard = async (req, res) => {
    const {dashboardName, uploadedBy, category} = req.body

    try {
        if (dashboardName !== ""){
            const newDashboard = new DashboardAccess({
                dashboardName: dashboardName,
                uploadedBy: uploadedBy,
                category: category
            })

            const dashboard = await newDashboard.save()
            console.log(dashboardName, uploadedBy, category)
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
export const updateTheDashboard = async (req, res) => {
    try {
        await DashboardAccess.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json({success: true, message: "Dashboard Updated."})
    } catch (error) {
        res.status(404).json({success: false, message: "Failed to Update the Dashboard"})
        console.log("Error while updating", error)
    }
}

export const deleteTheDashboard = async (req, res) => {
    try {
        await DashboardAccess.findByIdAndDelete(req.params.id)
        res.status(200).json({success: true, message: "Dashboard Deleted."})
    } catch (error) {
        res.status(401).json({success: false, message: "Failed to delete the dashboard"})
        console.log("Error while deleting", error)
    }
}

// controllers/userDashboardAccessController.js

export const createUserDashboardAccess = async (req, res) => {
  try {
    const userSpecificData  = req.body;

    const userData = {...userSpecificData.slice(0,1)}
    // console.log(userData[0])

    const allData = new MixedEntry({
        type: "user",
        ...userData[0],
        dashboards: [
            ...userSpecificData.slice(1, userSpecificData.length)
        ]
    })

    console.log(userSpecificData.slice(1, userSpecificData.length))


    const result = await MixedEntry.findOneAndReplace(
        { _id: allData._id },  // match existing doc
        allData,               // new object to replace with
        { upsert: true, new: true } // create if not exists
      );

    // const data = await result.save();
    // console.log(allData)

    if (!Array.isArray(userSpecificData)) {
        return res.status(400).json({ error: "Payload must be an array." });
      }
      
    res.status(200).json({success: true, message: "Inserted All the Documents", savedEntries:result })


  } catch (error) {
    console.error("Error saving user access:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getUserDashboardData = async (req, res) => {
    const {email} = req.body

    try {
        const userDashboardDetails = await MixedEntry.find({email})
        
        if (userDashboardDetails.length !== 0){
            res.status(200).json({success: true, message: "Received Request", userDashboards: userDashboardDetails[0].dashboards,mixedEntry: userDashboardDetails})
        }else {
        const allDashboards = await DashboardAccess.find()
        res.status(200).json({success: true, message: "Received Request", userDashboards: allDashboards})
        }
        console.log(userDashboardDetails)
        
    } catch (error) {
        res.status(400).json({success: false, message: "Error while fetching user data"})
        console.log("Error occurred",error )
    }
}
import mongoose from "mongoose"

const dashboardSchema = new mongoose.Schema({
    dashboardName : String,
    uploadedBy: String,
    isAllowed: {
        type: String,
        default: "No"
    },
    category: String
},{
    timestamps: true
}
)

const DashboardAccess = mongoose.model("Dashboards", dashboardSchema)

export default DashboardAccess
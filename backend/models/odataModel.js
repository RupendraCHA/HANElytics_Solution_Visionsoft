import mongoose from 'mongoose'

const automationSchema = new mongoose.Schema({
    Process: String,
    Automation_to_Hanlytic_np : [{
        _id: false,
        Product_ID: String,
        Product_name: String,
        Distribution_Center: String,
        Quantity: String
    }
]
})


const AutomationData = mongoose.model('AutomationData', automationSchema);

export default AutomationData
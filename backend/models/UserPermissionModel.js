// models/MixedEntry.js
import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  dashboardName: String,
  uploadedBy: String,
  isAllowed: String,
  category: String
}, { _id: false });

const mixedEntrySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["user"]
  },
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  contact: String,
  position: String,
  role: String,
  bussinessName: String,
  street: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  isVerified: Boolean,
  dashboards: [dashboardSchema]
}, { timestamps: true });

const MixedEntry = mongoose.model("MixedEntry", mixedEntrySchema);

export default MixedEntry
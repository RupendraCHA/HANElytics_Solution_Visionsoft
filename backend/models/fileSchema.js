import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  file: Buffer,
  mimeType: String,
  contentType: String,
  fileName: String,
});

const File = mongoose.model("procurementFiles", fileSchema);

export default File;

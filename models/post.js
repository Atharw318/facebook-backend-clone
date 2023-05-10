import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    user_Id: { type: Schema.Types.ObjectId, required:true},
    filename: {
        type: String,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      }
  },
  {
    timestamps: true,
  }
);

 
export default mongoose.model("post", postSchema);
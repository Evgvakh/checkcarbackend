import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true
        },
        zone: {
            type: String,
            required: true
        },
        checkID: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Image", ImageSchema);

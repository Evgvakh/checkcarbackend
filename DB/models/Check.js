import mongoose from "mongoose";

const CheckSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        dir: {
            type: String,
            required: true
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Check", CheckSchema);

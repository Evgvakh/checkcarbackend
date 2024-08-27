import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        access: {
            type: String,
            required: true,
            default: "USER"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);
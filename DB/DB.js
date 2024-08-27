import mongoose from "mongoose";
import 'dotenv/config'

export const connectToDB = () => {
    mongoose.connect(
        process.env.MONGO_URL
    )
    .then (() => console.log('Connected to DB'))
    .catch(err => { console.log("DB error", err) })
}
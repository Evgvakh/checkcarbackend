import mongoose from "mongoose";
import 'dotenv/config'

export const connectToDB = () => {
    mongoose.connect(
        process.env.DATABASE_URI
    )
    .then (() => console.log('Connected to DB'))
    .catch(err => { console.log("DB error", err) })
}
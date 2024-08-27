import mongoose from "mongoose";

export const connectToDB = () => {
    mongoose.connect(
        "mongodb+srv://evgvakh:MarkUp2022!@checkcar.jcdsbzx.mongodb.net/?retryWrites=true&w=majority&appName=CheckCar"
    )
    .then (() => console.log('Connected to DB'))
    .catch(err => { console.log("DB error", err) })
}
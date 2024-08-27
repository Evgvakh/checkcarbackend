import express from "express";
import cors from "cors";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

import { connectToDB } from "./DB/DB.js";

import { upload } from "./utils/multer.js";
import { uploadImg } from "./utils/upload.js";
import { createDIr } from "./utils/createDir.js";
import { checkAdminToken } from "./utils/middleware.js";

import Check from './DB/models/Check.js';
import Image from './DB/models/Image.js';
import User from "./DB/models/User.js";

import { addCheck, getAllChecks, getCheckByID } from './controllers/Check.js';
import { getImgsByCheckID, saveImgToDB, getImages, getImgsByPlate} from './controllers/Images.js'
import { addUser, adminLogin } from "./controllers/Users.js";

import { sendMail } from "./utils/nodemailer.js";
import mongoose from "mongoose";

// function setCorsHeaders(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// }

const app = express();
app.use(express.json());
// app.use(setCorsHeaders)
// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');  
  next();
})
app.use("/uploads", express.static("uploads"));

connectToDB();

app.post("/sendMail", sendMail);
app.post("/addCLientData", createDIr);

app.post("/upload/:id", upload.array("img"), uploadImg);
app.post('/saveImgToDB', saveImgToDB)
app.get('/getImages', getImages)
app.get('/getImgsByCheckID/:id', getImgsByCheckID);
app.get('/getImsByPlate/:plate', getImgsByPlate)

app.post('/addCheck', addCheck)
app.get('/getAllChecks', checkAdminToken, getAllChecks)
app.get('/getCheckByID/:id', getCheckByID)
app.post('/getCheckByUserAndPass', async (req, res) => {
  const check = await Check.findOne({email: req.body.email, password: req.body.password});
  if(!check) return res.send({errorMessage: 'Please verify your data'})
  const token = jwt.sign(
    {
      id: check._id,
      user: check.email,
      plate: check.plate
    },
    "OkCheckCarToken",
    {
      expiresIn: "24h"
    }    
  )
  res.json({check, token});
})

app.post('/createUser', addUser)
app.post('/adminLogin', adminLogin)

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log("SERVER DOWN");
  } else {
    return console.log("Server works");
  }
});

import Image from "../DB/models/Image.js";
import Check from "../DB/models/Check.js";
import { connectToDB } from './../DB/DB.js';

export const getImgsByCheckID = async (req, res) => {
    const data = await Image.find({ checkID: req.params.id });
    res.json(data);
}

export const saveImgToDB = async (req, res) => {    
    const imgDocument = new Image({
        filename: req.body.filename,
        zone: req.body.zone,
        checkID: req.body.checkID
    })

    const imgData = await imgDocument.save();
    res.json(imgData);
}

export const getImages = async (req, res) => {
    await connectToDB();    
    const image = await Image.find({ checkID: req.query.id, zone: req.query.zone })
    res.json(image)
}

export const getImgsByPlate = async (req, res) => {    
    const data = await Check.find({ plate: req.params.plate })    
    const idsArr = data.map(item => item._id)
    const images = []
    for (let i of idsArr) {
        const imgsById = await Image.find({ checkID: i }).sort({ createdAt: -1 })
        if (imgsById.length > 0) images.push(...imgsById)
    }
    res.json(images)
}
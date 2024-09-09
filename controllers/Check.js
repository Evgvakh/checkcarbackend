import Check from "../DB/models/Check.js";
import generator from 'generate-password'
import { connectToDB } from './../DB/DB.js';

export const getAllChecks = async (req, res) => {
    await connectToDB();
    const data = await Check.find({}).sort({ createdAt: -1 });
    res.json(data);
};

export const addCheck = async (req, res) => {
    await connectToDB();
    const password = generator.generate({
        length: 6,
        numbers: true
    });
    const checkDocument = new Check({
        name: req.body.name,
        lastName: req.body.lastName,
        plate: req.body.plate,
        email: req.body.email,
        dir: req.body.dir,
        password: password
    });
    const checkData = await checkDocument.save();
    res.json(checkData);
};

export const getCheckByID = async (req, res) => {
    try { 
        const data = await Check.findById(req.params.id) 
        if(data) {
            console.log(data)
            res.json(data)
        } else {
            console.log('error')
            res.json({errorMessage: "wrong checkID"})
        }
    } catch (err) {
        res.json({ errorMessage: err })
    }

};



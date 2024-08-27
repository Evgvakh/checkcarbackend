import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export const createDIr = (req, res) => {      
    const __filename = fileURLToPath(import.meta.url);    
    const __dirname = path.dirname(__filename);    
    fs.mkdir(`uploads/${req.body.date}_${req.body.plate}_${req.body.lastName}`, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Folder created successfully!');
        }
      });
    res.json(`${req.body.date}_${req.body.plate}_${req.body.lastName}`)
}
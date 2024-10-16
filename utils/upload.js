
import { v2 as cloudinary} from 'cloudinary'
import path from 'path';

cloudinary.config({
    cloud_name: "dnvl2jic7",
    api_key: '594593994941789',
    api_secret: 'EKoYHrYa3ptzm8ahyL-wYhWdSMM'
})

export const uploadImg = async (req, res) => {
    let imagesURLs = [];
    for (let i of req.files) { imagesURLs.push(path.resolve(i.path)) };
    
    const imagesData = []
    for (let image of imagesURLs) {
        const imgData = await cloudinary.uploader.upload(image, { folder: req.params.folder })
        console.log(imgData)
        imagesData.push(imgData.secure_url)
    }
    res.json(imagesData)
}

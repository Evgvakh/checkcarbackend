export const uploadImg = (req, res) => {
    let imagesURLs = [];
    for (let i of req.files) { imagesURLs.push(`uploads/${req.params.id}/${i.originalname}`) };
    res.json(imagesURLs);
}
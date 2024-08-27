import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/${req.params.id}`);
    },

    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
export const upload = multer({ storage: storage });
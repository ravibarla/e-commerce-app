//1. import multer
import multer from "multer";

//2. configure storage with filename and location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString() + file.originalname);//ubuntu
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); //win
  },
});

const upload = multer({ storage });
export default upload;

import multer from "multer";

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./public/temp");}
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;

// const storage = multer.diskStorage({
//If you pass destination as a function, Multer delegates the responsibility to you,
// meaning you are expected to make sure the directory already exists.
//If you pass destination as a string, Multer will automatically create the directory for you
// if it doesn't exist.
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {

//       cb(null, file.originalname)
//     }
//   })

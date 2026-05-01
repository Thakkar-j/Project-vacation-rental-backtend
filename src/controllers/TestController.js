import testSchema from "../models/testModels.js";
import { uploadOnCloudinary } from "../utils/CloudinaryConfig.js";
import fs from "fs";
//In this only for post request(for upload file)

const addTest = async (req, res) => {
  try {
    //to access files path
    console.log("files....(backend)", req.files);

    //Getting local path of all files
    const thumbnailLocalPath = req.files?.thumbnailImage[0]?.path;
    const internalImagesLocalPaths =
      req.files?.internalImages?.map((file) => file.path) || [];

    // 1. Upload Thumbnail to Cloudinary
    const thumbnailCloudinaryResponse =
      await uploadOnCloudinary(thumbnailLocalPath);

    // 2. Upload multiple Internal Images to Cloudinary
    const internalImagesUrls = [];
    for (const localPath of internalImagesLocalPaths) {
      const uploadResponse = await uploadOnCloudinary(localPath);
      if (uploadResponse) {
        internalImagesUrls.push(uploadResponse.secure_url);
      }
    }
    // secure_url give path of image on cloudinary
    const savedTest = await testSchema.create({
      ...req.body,
      thumbnailImage: thumbnailCloudinaryResponse.secure_url,
      internalImages: internalImagesUrls,
    });

    //detete files form local storage
    fs.unlinkSync(thumbnailLocalPath);
    internalImagesLocalPaths.forEach((localPath) => fs.unlinkSync(localPath));

    res.status(201).json({
      data: savedTest,
      message: "Test form submitted succesfully(Backend)",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { addTest };

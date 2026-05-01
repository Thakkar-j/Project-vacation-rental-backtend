import PropertySchema from "../models/propertyModel.js";
import { uploadOnCloudinary } from "../utils/CloudinaryConfig.js";
import fs from "fs";

const addProperty = async (req, res) => {
  try {
    // Getting local path of all files from multer
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
    // save property details to dataBase
    const savedProperty = await PropertySchema.create({
      ...req.body,
      thumbnailImage: thumbnailCloudinaryResponse.secure_url,
      internalImages: internalImagesUrls,
    });

    // 3. Delete files from local storage
    if (thumbnailLocalPath) fs.unlinkSync(thumbnailLocalPath);
    internalImagesLocalPaths.forEach((localPath) => fs.unlinkSync(localPath));

    res.status(201).json({
      message: "Property added successfully(Backend)",
      data: savedProperty,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding property",
      error: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  const allProperties = await PropertySchema.find();
  try {
    res.json({
      message: "all properties",
      TotalProperties: allProperties.length,
      data: allProperties,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching properties",
      error: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  const foundProperty = await PropertySchema.findById(req.params.id);
  if (foundProperty) {
    res.json({
      message: "Property Found",
      data: foundProperty,
    });
  } else {
    res.json({ message: "Property not found" });
  }
};

const updateProperty = async (req, res) => {
  const updatedProperty = await PropertySchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.status(200).json({
    message: "Property updated successfully...",
    UpdatedFields: Object.keys(req.body),
    updatedProperty,
  });
};

const deleteProperty = async (req, res) => {
  const deletedProperty = await PropertySchema.findByIdAndDelete(req.params.id);
  if (deletedProperty) {
    res.status(200).json({
      message: "Property deleted successfully",
      data: deletedProperty,
    });
  } else {
    res.status(200).json({
      message: "Property not found",
    });
  }
};

const searchProperty = async (req, res) => {
  const searchedProperty = await PropertySchema.find({
    title: new RegExp(req.query.s, "i"),
  });
  res.json({
    message: "Search results",
    SearchTerm: req.query.s,
    searchParams: req.query,
    data: searchedProperty,
  });
};

export default {
  getAllProperties,
  getPropertyById,
  addProperty,
  deleteProperty,
  updateProperty,
  searchProperty,
};

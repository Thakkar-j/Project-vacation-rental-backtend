import express from "express";
const router = express.Router();

import propertyController from "../controllers/PropertyController.js";
import upload from "../middleware/test.multer.js";

//property routes
router.get("/properties", propertyController.getAllProperties);
router.get("/property/:id", propertyController.getPropertyById);
// This going to have midddleware (multer)
router.post(
  "/property",
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "internalImages", maxCount: 3 },
  ]),
  propertyController.addProperty,
);

router.delete("/property/:id", propertyController.deleteProperty);
router.put("/property/:id", propertyController.updateProperty);
router.get("/search", propertyController.searchProperty);
export default router;

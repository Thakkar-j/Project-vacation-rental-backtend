import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./src/utils/DBconnections.js";
const app = express();

//You can pass frontEnd URL in cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is data base connection
dbConnection();

import userRoutes from "./src/routes/userRoutes.js";
app.use("/api/users", userRoutes);

import propertyRoutes from "./src/routes/propertyRoutes.js";
app.use("/api/prop", propertyRoutes);

import contactRoutes from "./src/routes/contactRoutes.js";
app.use("/api", contactRoutes);

//Test routes
// import testRoutes from "./src/routes/testRoutes.js";
// app.use("/api", testRoutes);

// Auth router
import authRoutes from "./src/routes/authRoutes.js";
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Backend...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} and URL of it is http://localhost:${PORT}`,
  );
});

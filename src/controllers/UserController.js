import UserSchema from "../models/userModel.js";

const addUser = async (req, res) => {
  try {
    const savedUser = await UserSchema.create(req.body);
    res.status(201).json({
      message: "User added successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  //db query
  const allUsers = await UserSchema.find();
  res.json({
    message: "all users",
    TotalUsers: allUsers.length,
    data: allUsers,
  });
};

const getUserById = async (req, res) => {
  //req.params.id
  //const foundUser = await userSchema.find({_id:req.params.id})
  const foundUser = await UserSchema.findById(req.params.id);
  if (foundUser) {
    res.json({
      message: "User Found ",
      data: foundUser,
    });
  } else {
    res.json({ message: "User not found" });
  }
};

const updateUser = async (req, res) => {
  //update users ---> where id =?
  //db.users.updateOne({$set:{,,,},{_id:?}})
  //new data to update : req.body
  //where ?? id : req.params.id
  const updatedUser = await UserSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.status(200).json({
    message: "User Update succesfully...",
    "Updated property": Object.keys(req.body),
    // Object: req.body,
    "Updated user": updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const deletedUser = await UserSchema.findOneAndDelete({
    email: req.params.email,
  });
  if (deletedUser) {
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } else {
    res.status(200).json({
      message: "User not found",
    });
  }
};

//Search user using name
const searchUser = async (req, res) => {
  const searchedUser = await UserSchema.find({
    //req.query.s --> search keyword(What is passed after ? in URL with key s)
    //In URL : http://localhost:3002/user/search?s=john
    userName: new RegExp(req.query.s, "i"),
  });
  res.json({
    message: "Search results",
    "Search term": req.query.s,
    searchParams: req.query,
    data: searchedUser,
  });
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  searchUser,
};

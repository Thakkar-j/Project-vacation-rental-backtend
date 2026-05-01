import { connect } from "mongoose";

import dotenv from "dotenv";
dotenv.config();
//Connection string:- mongodb://localhost:27017/
//Database Name:- VacationRental
//Here connect function is promise
//Connection function(pass:- "mongodb://localhost:27017/VacationRental"):-
//Data base not going to show until document inserted in it...
const dbConnection = () => {
  connect(process.env.MONGODB_URI)
    .then((result) => {
      console.log("db connected succesfully");
    })
    .catch((err) => {
      console.log("db not connected.... Error:-", err);
    });
};

//imported in app.js file....
export { dbConnection };

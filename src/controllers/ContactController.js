import contactSchema from "../models/contactModel.js";

//This is going to post request
const addContact = async (req, res) => {
  try {
    const savedContact = await contactSchema.create(req.body);
    res.status(201).json({
      data: savedContact,
      mesaage: "Contact form submitted succesfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//This is going to get request

const getContact = async (req, res) => {
  try {
    const allContact = await contactSchema.find();
    res.status(200).json({
      message: "All contact form data",
      totalContact: allContact.length,
      data: allContact,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { addContact, getContact };

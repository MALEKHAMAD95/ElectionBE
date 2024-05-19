const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, default: "" },
    secondName: { type: String, default: "" },
    thirdName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    profileImage: { type: String }, // Assuming profile image is stored as a URL
    mobileNumber: { type: String, default: "" },
    nationality: { type: String, default: "USA" }, // Changed to String type
    dateOfBirth: { type: String, default: "" }, // Assuming date of birth is stored as a string
    nationalityId: { type: String, default: "" },
    workFromDate: { type: String, default: "" }, // Assuming work from date is stored as a string
    workToDate: { type: String, default: "" }, // Assuming work to date is stored as a string
    email: { type: String, default: "" },
    password: { type: String, default: null },
    userName: { type: String, default: "" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const db = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log('Error ' + error);
    }
}
module.exports = db;
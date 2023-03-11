const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongoose connected on ${mongoose.connection.host}`)
  } catch (error) {
    console.log(error);
    process.exit(1);
    // throw new Error(error);
  }
};

module.exports = {
  connectDB,
};

const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery', false)
const URL =
  process.env.DATABASE || "mongodb://localhost:27017/yourDatabaseName";

try {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
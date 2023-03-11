require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./utils/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = 5000 || process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/user", require("./routes/userRoute"));

// app.get("/", (req, res) => {
//   res.send("Hi");
// });

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { facultyAuth } = require("./routes/Faculty-Auth");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.post("/faculty-register", facultyAuth);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

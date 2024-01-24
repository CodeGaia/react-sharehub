const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { facultyAuth } = require("./routes/Faculty-Auth/Faculty-Register");
const { facultyLogin } = require("./routes/Faculty-Auth/Faculty-Login");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.post("/faculty-register", facultyAuth);
app.post("/faculty-login", facultyLogin);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

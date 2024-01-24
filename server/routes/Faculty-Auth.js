const { request } = require("express");
const db = require("../connection/route");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const facultyAuth = (req, res) => {
  const username = req.body.username;
  const phoneNumber = req.body.phone_number;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;

    db.query(
      "INSERT INTO faculty_users (username, phone_number, email, password) VALUES (?, ?, ?, ?)",
      [username, phoneNumber, email, hash],
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.send(result);
        } else {
          req.send({ message: "Enter correct asked details" });
        }
      }
    );
  });
};

module.exports = { facultyAuth };

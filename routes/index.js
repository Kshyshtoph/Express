const express = require("express");
const router = express.Router();
const login = "admin";
const password = "123";

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Logowanie" });
});
router.post("/login", (req, res) => {
  console.log(req.body);
  if (req.body.login === login && req.body.password === password) {
    req.session.admin = 1;
    res.redirect("/admin");
  } else {
    res.redirect("/admin/login");
  }
});
module.exports = router;

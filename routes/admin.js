const express = require("express");
const router = express.Router();
const News = require("../models/news");
router.all("*", (req, res, next) => {
  if (req.session.admin !== 1) {
    res.redirect("/login");
    return;
  }
  next();
});
router.get("/", (req, res) => {
  // console.log(req.session.admin);
  const data = News.find({}, (err, data) => {
    console.log(data);
    res.render("admin/index", { title: "Admin", data });
  });
});
router.get("/news/add", (req, res) => {
  res.render("admin/newsForm", { title: "Dodaj newsa", errors: {} });
});
router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, err => {
    res.redirect("/");
  });
});

router.post("/news/add", (req, res) => {
  const newsData = new News(req.body);
  const errors = newsData.validateSync();
  newsData.save();
  console.log(errors);
  if (errors !== []) {
    res.redirect("/");
  }
  res.render("admin/newsForm", { title: "dodaj newsa", errors });
});
module.exports = router;

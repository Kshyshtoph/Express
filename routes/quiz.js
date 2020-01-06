const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res) => {
  const show = !req.session.votes;

  Quiz.find({}, (err, data) => {
    let summ = 0;
    data.forEach(item => {
      summ += item.votes;
    });

    res.render("quiz", { title: "Quiz", data, show, summ });
  });
});
router.post("/", (req, res) => {
  const id = req.body.quiz;
  Quiz.findOne({ _id: id }, (err, data) => {
    data.votes++;
    data.save(() => {
      req.session.votes = 1;
      res.redirect("/quiz");
    });
  });
});

module.exports = router;

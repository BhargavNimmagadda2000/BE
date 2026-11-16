exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login to AirBnB",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
      res.redirect("/login");
  })
  //res.clearCookie("isLoggedIn"); // or res.cookie("isLoggedIn", false);
  //res.redirect("/login");
}
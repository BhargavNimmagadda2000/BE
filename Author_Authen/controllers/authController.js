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

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup to AirBnB",
    currentPage: "signup",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postSignup = (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const terms_and_conditions = req.body.terms_and_conditions;
  const user_type = req.body.user_type;
  console.log(req.body)
  res.redirect("/login");
};

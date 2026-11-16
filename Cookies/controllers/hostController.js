const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing
  Home.findById(homeId).then(home => {
    if(!home) {
      return res.redirect("/host/host-home-list");
    } 
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit Home",
      currentPage: "editHome",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
    })
  }).catch(err => {
    console.error(err);
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
    })
  })
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home({houseName, price, location, rating, photoUrl, description});
  home.save().then(() => {
    console.log("Home added successfully");
  }).catch(err => {
    console.error(err);
  });
  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  // or can use findByIdAndUpdate(id, {houseName, price, location, rating, photoUrl, description}) instead of dindById.then and then ....
  Home.findById(id).then(home => {
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;
    home.save().then(() => {
    console.log("Home updated successfully");
    }).catch(err => {
      console.error(err);
    });
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.error(err);
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(() => {
    console.log(`Home with ID ${homeId} deleted successfully.`);
  }).catch(err => {
    console.error(err);
  });
  res.redirect("/host/host-home-list");
}


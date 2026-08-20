const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing
  Home.fetchById(homeId, (home) => {
    if(!home) {
      return res.redirect("/host/host-home-list");
    } 
    res.render("host/edit-home", {
      pageTitle: "Edit Home",
      currentPage: "editHome",
      editing: editing,
      home: home
    });
  })
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();

  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Home with ID ${homeId} deleted successfully.`);
    }
  });
  res.redirect("/host/host-home-list");
}


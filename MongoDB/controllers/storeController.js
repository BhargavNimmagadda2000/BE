const Home = require("../models/home");
const Favourite = require("../models/favourites");
const { ObjectId } = require('mongodb');
exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.fetchById(new ObjectId(String(homeId))).then((home) => {
    if (!home) {
      return res.redirect("/homes");
    }
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "home-detail",
    });
  });
};


exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
      res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
        currentPage: "Home",
      })
    })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.homeId);
    Home.fetchAll().then(registeredHomes => {
      console.log(favourites);
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  const favourite = new Favourite(homeId);
  favourite.save().then((result) => {
    console.log(`Home with ID ${homeId} added to favourites.`);
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    res.redirect("/favourites");
  });
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.removeFromFavourites(homeId).then((result) => {
    console.log(`Home with ID ${homeId} removed from favourites.`);
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

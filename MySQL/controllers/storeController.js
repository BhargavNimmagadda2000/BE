const Home = require("../models/home");
const Favourite = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.fetchById(homeId).then(([homes]) => {
    const home = homes[0];
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
  Home.fetchAll().then(([registeredHomes]) => {
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
  Favourite.getFavourites((favouriteIds) => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter(home => favouriteIds.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      }); 
    })
  });
}

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  Favourite.addToFavourites(homeId, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Home with ID ${homeId} added to favourites.`);
      res.redirect("/favourites");
    }
  });  
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.removeFromFavourites(homeId, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Home with ID ${homeId} removed from favourites.`);
      res.redirect("/favourites");
    }
  });
}

const Home = require("../models/home");
const Favourite = require("../models/favourites");
const { ObjectId } = require('mongodb');
exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(new ObjectId(String(homeId))).then((home) => {
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
  Home.find().then((registeredHomes) => {
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

  // always fetching all favourites and all homes, then filtering the homes that are in favourites is not ideal if there's large data
  // Favourite.find().then(favourites => {
  //   favourites = favourites.map(fav => fav.homeId.toString());
  //   Home.find().then(registeredHomes => {
  //     console.log(favourites);
  //     const favouriteHomes = registeredHomes.filter((home) =>
  //       favourites.includes(home._id.toString())
  //     );
  //     res.render("store/favourite-list", {
  //       favouriteHomes: favouriteHomes,
  //       pageTitle: "My Favourites",
  //       currentPage: "favourites",
  //     });
  //   });
  // });
  Favourite.find()
  .populate('homeId').then(favourites => {
    const favouriteHomes = favourites.map(fav => fav.homeId);
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  }).catch((err) => {
    console.error(err);
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  // issue with this approach is findOne and redirect are not in the same async function, so the redirect is not guaranteed to happen after the findOne is complete
  Favourite.findOne({homeId: homeId}).then(favourite => {
    if(favourite) {
      console.log(`Home with ID ${homeId} already in favourites.`);
    } else {
      favourite = new Favourite({homeId: homeId});
      favourite.save().then((result) => {
        console.log(`Home with ID ${homeId} added to favourites.`);
      });
    }
    res.redirect("/favourites");
  }).catch((err) => {
    console.error(err);
  });
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({homeId: homeId}).then((result) => {
    console.log(`Home with ID ${homeId} removed from favourites.`);
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

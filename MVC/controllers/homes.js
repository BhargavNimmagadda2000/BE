const Home = require('../models/home');

exports.getAddHome = (req, res) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb'});
}

const registeredHomes = [];

exports.postAddHome = (req, res, next) => {
  const { houseName, location, price, rating, photoUrl } = req.body;
  const home = new Home(houseName, location, price, rating, photoUrl);
  home.save();
  res.render('homeAdded', {pageTitle: 'Home Added Successfully'});
}

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'});
  });
}


exports.registeredHomes = registeredHomes;

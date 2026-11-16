// Core Module
const path = require('path');
const mongoose = require('mongoose');
// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");


const app = express();

const MONGO_URL = "mongodb+srv://bhargavnssd_db_user:E6xmqAcx2Mg2e7xx@clusternodejs.isxzzqw.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ClusterNodeJS";


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions'
})
app.use(session({
  // Secret key used to sign in the session ID cookie and exreypt the session data
  secret: 'my secret',
  resave: false, // forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // forces a session that is new, but not modified, to be saved to the store
  store: store // store instance to save the session data in MongoDB
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
// app.use((req, res, next) => {
//   console.log(req.get('Cookie'));
//   req.isLoggedIn = req.get('Cookie')?.split('=')[1] || false;
//   next();
// })
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if(req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);
app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3111;

mongoose.connect(MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});

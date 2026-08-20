const express = require('express');
const hostRouter = require('./routes/host');
const userRouter = require('./routes/user');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(hostRouter);
app.use((req, res, next) => {
    res.status(404).send(`<h1>Page not found</h1><a href="/">Back to Home</a>`);
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});